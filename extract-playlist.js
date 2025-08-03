const https = require('https');
const fs = require('fs');

// YouTube playlist ID from the URL
const playlistId = 'PLRZI-uS7qxtBsJeiJJfYy_paW2jy3N9Vz';
const baseUrl = 'https://www.youtube.com/playlist?list=' + playlistId;

console.log('🎥 Extracting YouTube playlist data...');
console.log('📋 Playlist URL:', baseUrl);
console.log('🆔 Playlist ID:', playlistId);

// Function to fetch playlist data
function fetchPlaylistData() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'www.youtube.com',
            path: '/playlist?list=' + playlistId,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
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

// Function to extract video data from HTML
function extractVideoData(html) {
    const videos = [];
    
    // Look for video IDs in the HTML
    const videoIdPattern = /"videoId":"([^"]+)"/g;
    const titlePattern = /"title":"([^"]+)"/g;
    
    let videoIdMatch;
    let titleMatch;
    
    // Extract video IDs
    const videoIds = [];
    while ((videoIdMatch = videoIdPattern.exec(html)) !== null) {
        if (videoIdMatch[1] && videoIdMatch[1].length === 11) {
            videoIds.push(videoIdMatch[1]);
        }
    }
    
    // Extract titles
    const titles = [];
    while ((titleMatch = titlePattern.exec(html)) !== null) {
        if (titleMatch[1] && titleMatch[1].length > 0) {
            titles.push(titleMatch[1]);
        }
    }
    
    console.log('📊 Found video IDs:', videoIds.length);
    console.log('📊 Found titles:', titles.length);
    
    // Create video objects
    for (let i = 0; i < Math.min(videoIds.length, titles.length); i++) {
        videos.push({
            id: videoIds[i],
            title: titles[i],
            thumbnail: `https://img.youtube.com/vi/${videoIds[i]}/maxresdefault.jpg`,
            description: `Live view from ${titles[i]}`
        });
    }
    
    return videos;
}

// Function to generate JavaScript code
function generateJavaScriptCode(videos) {
    let jsCode = `// Kyoto Live Stream Collection - Extracted from YouTube Playlist
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
        fs.writeFileSync('extracted-streams.js', jsCode);
        console.log('💾 Saved extracted streams to extracted-streams.js');
        
        // Also save as JSON for reference
        fs.writeFileSync('extracted-streams.json', JSON.stringify(videos, null, 2));
        console.log('💾 Saved JSON data to extracted-streams.json');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

main(); 