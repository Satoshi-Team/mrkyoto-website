const https = require('https');
const fs = require('fs');

// YouTube playlist ID from the URL
const playlistId = 'PLRZI-uS7qxtBsJeiJJfYy_paW2jy3N9Vz';

console.log('🎥 Extracting YouTube playlist data (v2)...');
console.log('📋 Playlist URL: https://www.youtube.com/playlist?list=' + playlistId);
console.log('🆔 Playlist ID:', playlistId);

// Function to fetch playlist data with better headers
function fetchPlaylistData() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'www.youtube.com',
            path: '/playlist?list=' + playlistId,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate, br',
                'DNT': '1',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Cache-Control': 'max-age=0'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                resolve(data);
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.end();
    });
}

// Function to extract video data from HTML with multiple patterns
function extractVideoData(html) {
    const videos = [];
    
    console.log('🔍 Analyzing HTML content...');
    console.log('📏 HTML length:', html.length);
    
    // Multiple patterns to try
    const patterns = [
        // Pattern 1: Look for videoId in JSON data
        /"videoId":"([^"]{11})"/g,
        // Pattern 2: Look for video IDs in playlist items
        /"playlistVideoRenderer":\s*{[^}]*"videoId":"([^"]{11})"/g,
        // Pattern 3: Look for video IDs in ytInitialData
        /"videoId":"([^"]{11})"[^}]*"title":\s*{\s*"runs":\s*\[\s*{\s*"text":\s*"([^"]+)"/g,
        // Pattern 4: Simple video ID pattern
        /watch\?v=([^"&]{11})/g
    ];
    
    const foundVideoIds = new Set();
    
    patterns.forEach((pattern, index) => {
        console.log(`🔍 Trying pattern ${index + 1}...`);
        let match;
        let count = 0;
        
        while ((match = pattern.exec(html)) !== null) {
            const videoId = match[1];
            if (videoId && videoId.length === 11 && !foundVideoIds.has(videoId)) {
                foundVideoIds.add(videoId);
                count++;
            }
        }
        
        console.log(`📊 Pattern ${index + 1} found ${count} unique video IDs`);
    });
    
    // Convert to array and create video objects
    const videoIds = Array.from(foundVideoIds);
    
    console.log('📊 Total unique video IDs found:', videoIds.length);
    
    // Create video objects with generic titles
    videoIds.forEach((videoId, index) => {
        videos.push({
            id: videoId,
            title: `Kyoto Live Stream ${index + 1}`,
            description: `Live view from Kyoto location ${index + 1}`,
            thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        });
    });
    
    return videos;
}

// Function to generate JavaScript code
function generateJavaScriptCode(videos) {
    let jsCode = `// Kyoto Live Stream Collection - Extracted from YouTube Playlist
// Source: https://www.youtube.com/watch?v=jqtsC5BYlIk&list=PLRZI-uS7qxtBsJeiJJfYy_paW2jy3N9Vz
const playlistStreams = [
`;
    
    videos.forEach((video, index) => {
        jsCode += `    {
        id: '${video.id}',
        title: '${video.title.replace(/'/g, "\\'")}',
        description: '${video.description.replace(/'/g, "\\'")}',
        thumbnail: '${video.thumbnail}'
    }`;
        
        if (index < videos.length - 1) {
            jsCode += ',';
        }
        jsCode += '\n';
    });
    
    jsCode += `];

console.log('🎥 Extracted ${videos.length} streams from YouTube playlist');
console.log('📋 Playlist URL: https://www.youtube.com/watch?v=jqtsC5BYlIk&list=PLRZI-uS7qxtBsJeiJJfYy_paW2jy3N9Vz');
`;

    return jsCode;
}

// Main execution
async function main() {
    try {
        console.log('🔄 Fetching playlist data...');
        const html = await fetchPlaylistData();
        
        console.log('🔍 Extracting video data...');
        const videos = extractVideoData(html);
        
        if (videos.length === 0) {
            console.log('❌ No videos found in playlist');
            return;
        }
        
        console.log('✅ Extracted videos:');
        videos.forEach((video, index) => {
            console.log(`${index + 1}. ${video.title} (${video.id})`);
        });
        
        // Generate JavaScript code
        const jsCode = generateJavaScriptCode(videos);
        
        // Save to file
        fs.writeFileSync('extracted-streams-v2.js', jsCode);
        console.log('💾 Saved extracted streams to extracted-streams-v2.js');
        
        // Also save as JSON for reference
        fs.writeFileSync('extracted-streams-v2.json', JSON.stringify(videos, null, 2));
        console.log('💾 Saved JSON data to extracted-streams-v2.json');
        
        // Show first few video IDs for verification
        console.log('\n🔍 First 10 video IDs for verification:');
        videos.slice(0, 10).forEach((video, index) => {
            console.log(`${index + 1}. ${video.id}`);
        });
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

main(); 