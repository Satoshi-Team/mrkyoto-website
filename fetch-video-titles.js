const https = require('https');
const fs = require('fs');

// Video IDs from the playlist
const videoIds = [
    'jqtsC5BYlIk',
    'wuC8wRvXock', 
    'Op-lf2NRMzs',
    'KHglGodzQ9g',
    'v9rQqa_VTEY',
    'S6IkZhhwG4A',
    'Gxt3YCa2Phc',
    'CO_ZjH6N7RE',
    'PXg3ZXgMkGk',
    'Onyb8uHQV5Y',
    'ldO0Eqoomms',
    '4Za-6AXfu4w',
    'Qm4X_oY-9YM',
    'TUjpxCuWZ4c'
];

console.log('🎥 Fetching actual video titles from YouTube...');
console.log('📋 Playlist URL: https://www.youtube.com/watch?v=jqtsC5BYlIk&list=PLRZI-uS7qxtBsJeiJJfYy_paW2jy3N9Vz');

// Function to fetch video page and extract title
function fetchVideoTitle(videoId) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'www.youtube.com',
            path: `/watch?v=${videoId}`,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                // Extract title from HTML
                const titleMatch = data.match(/<title[^>]*>([^<]+)<\/title>/i);
                if (titleMatch && titleMatch[1]) {
                    let title = titleMatch[1].replace(' - YouTube', '').trim();
                    resolve(title);
                } else {
                    resolve(`Video ${videoId}`);
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.end();
    });
}

// Function to generate the correct streams array with actual titles
function generateCorrectStreams(videoIdsWithTitles) {
    const streams = [];
    
    videoIdsWithTitles.forEach((item, index) => {
        streams.push({
            id: item.id,
            title: item.title,
            description: `Live view from ${item.title}`,
            thumbnail: `https://img.youtube.com/vi/${item.id}/maxresdefault.jpg`
        });
    });
    
    return streams;
}

// Function to generate JavaScript code
function generateJavaScriptCode(streams) {
    let jsCode = `// Kyoto Live Stream Collection - CORRECT Video IDs and Titles from Playlist
// Source: https://www.youtube.com/watch?v=jqtsC5BYlIk&list=PLRZI-uS7qxtBsJeiJJfYy_paW2jy3N9Vz
// Actual titles fetched from YouTube videos
const playlistStreams = [
`;
    
    streams.forEach((stream, index) => {
        jsCode += `    {
        id: '${stream.id}',
        title: '${stream.title.replace(/'/g, "\\'")}',
        description: '${stream.description.replace(/'/g, "\\'")}',
        thumbnail: '${stream.thumbnail}'
    }`;
        
        if (index < streams.length - 1) {
            jsCode += ',';
        }
        jsCode += '\n';
    });
    
    jsCode += `];

console.log('🎥 Extracted ${streams.length} streams with actual titles from YouTube playlist');
console.log('📋 Playlist URL: https://www.youtube.com/watch?v=jqtsC5BYlIk&list=PLRZI-uS7qxtBsJeiJJfYy_paW2jy3N9Vz');
`;

    return jsCode;
}

// Main execution
async function main() {
    try {
        console.log('🔄 Fetching video titles...');
        const videoIdsWithTitles = [];
        
        for (let i = 0; i < videoIds.length; i++) {
            const videoId = videoIds[i];
            console.log(`📹 Fetching title for video ${i + 1}/${videoIds.length}: ${videoId}`);
            
            try {
                const title = await fetchVideoTitle(videoId);
                videoIdsWithTitles.push({
                    id: videoId,
                    title: title
                });
                console.log(`✅ ${videoId} → ${title}`);
            } catch (error) {
                console.log(`❌ Error fetching ${videoId}: ${error.message}`);
                videoIdsWithTitles.push({
                    id: videoId,
                    title: `Video ${videoId}`
                });
            }
            
            // Add delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        console.log('\n📊 All video titles fetched:');
        videoIdsWithTitles.forEach((item, index) => {
            console.log(`${index + 1}. ${item.id} → ${item.title}`);
        });
        
        console.log('\n🔧 Generating correct streams...');
        const streams = generateCorrectStreams(videoIdsWithTitles);
        
        // Generate JavaScript code
        const jsCode = generateJavaScriptCode(streams);
        
        // Save to file
        fs.writeFileSync('correct-streams-with-titles.js', jsCode);
        console.log('💾 Saved correct streams with actual titles to correct-streams-with-titles.js');
        
        // Also save as JSON for reference
        fs.writeFileSync('correct-streams-with-titles.json', JSON.stringify(streams, null, 2));
        console.log('💾 Saved JSON data to correct-streams-with-titles.json');
        
        console.log('\n🎯 Ready to update live-kyoto-widget.js with correct titles!');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

main(); 