// Function to check if the device is Android
function isAndroid() {
    return /Android/i.test(navigator.userAgent);
}

// Function to fix video playback on Android devices
function fixAndroidVideoPlayback() {
    if (isAndroid()) {
        // Get all video elements
        const videos = document.querySelectorAll('video');
        
        // For each video element
        videos.forEach(video => {
            // Remove any existing sources
            while (video.firstChild) {
                video.removeChild(video.firstChild);
            }
            
            // Create and add MP4 source first for Android
            const mp4Source = document.createElement('source');
            
            // Get the webm source and convert to mp4
            let webmSrc = '';
            let movSrc = '';
            
            // Find the original sources
            const originalSources = video.querySelectorAll('source');
            originalSources.forEach(source => {
                if (source.type === 'video/webm') {
                    webmSrc = source.src;
                } else if (source.type === 'video/mp4') {
                    movSrc = source.src;
                }
            });
            
            // Use the .mov source but change extension to .mp4 if available
            if (movSrc) {
                mp4Source.src = movSrc.replace('.mov', '.mp4');
                mp4Source.type = 'video/mp4';
                video.appendChild(mp4Source);
            }
            
            // Add webm as fallback
            if (webmSrc) {
                const webmSource = document.createElement('source');
                webmSource.src = webmSrc;
                webmSource.type = 'video/webm';
                video.appendChild(webmSource);
            }
            
            // Force video reload
            video.load();
            
            // If video had autoplay, restart it
            if (video.hasAttribute('autoplay')) {
                video.play();
            }
        });
    }
}

// Run the fix when the document is loaded
document.addEventListener('DOMContentLoaded', fixAndroidVideoPlayback);
