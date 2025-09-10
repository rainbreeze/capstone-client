import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';

const TempPage = () => {
    const pdfUrl = "https://drive.google.com/file/d/1physI-5jIF3XxK85-g4JJAvk6iw58SKO/preview"
    return (
        <div>
            <Header />
            <div style={styles.container}>
                <h1 style={styles.title}>발표자료</h1>
                <iframe
                    src={pdfUrl}
                    width="80%"
                    height="600px"
                    allow="autoplay"
                    style={styles.iframe}
                    title="Google Drive PDF"
                ></iframe>
            </div>
            <Footer />
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '40px',
    },
    title: {
        fontFamily: 'Jua',
        fontSize: '3vw',
        marginBottom: '20px',
    },
    iframe: {
        border: 'none',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
};

export default TempPage;
