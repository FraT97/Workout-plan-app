function HomePage() {
    return (
       <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                <iframe
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    src="https://www.youtube.com/embed/cbZPmamXQTg"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="YouTube Video"
                ></iframe>
            </div>
        
    );
}

export default HomePage;
