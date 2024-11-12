const socialIcons = [
    { class: 'facebook', icon: 'fab fa-facebook-f', name: 'Facebook', stats: '2.9B Pengguna', url: 'https://www.facebook.com' },
    { class: 'twitter', icon: 'fab fa-twitter', name: 'Twitter', stats: '397M Pengguna', url: 'https://www.twitter.com' },
    { class: 'instagram', icon: 'fab fa-instagram', name : 'Instagram', stats: '2B Pengguna', url: 'https://www.instagram.com' },
    { class: 'youtube', icon: 'fab fa-youtube', name: 'YouTube', stats: '2.5B Pengguna', url: 'https://www.youtube.com' },
    { class: 'linkedin', icon: 'fab fa-linkedin-in', name: 'LinkedIn', stats: '875M Pengguna', url: 'https://www.linkedin.com' },
    { class: 'tiktok', icon: 'fab fa-tiktok', name: 'TikTok', stats: '1.5B Pengguna', url: 'https://www.tiktok.com' }
];

const ring = document.getElementById('socialRing');
let isRotating = true;
let currentDirection = 1;

function createSocialIcons() {
    const radius = 100; // Radius yang lebih kecil agar ikon berada lebih dekat ke profil
    const totalIcons = socialIcons.length;

    socialIcons.forEach((social, index) => {
        const angle = (index / totalIcons) * Math.PI; // Setengah lingkaran
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        const item = document.createElement('div');
        item.className = 'social-item';
        item.style.transform = `translate3d(${x}px, 0, ${z}px)`;

        const icon = document.createElement('div');
        icon.className = `social-icon ${social.class}`;
        icon.innerHTML = `<i class="${social.icon}"></i>`;
        
        // Tambahkan event listener untuk mengarahkan ke URL
        icon.addEventListener('click', () => {
            window.open(social.url, '_blank'); // Membuka URL di tab baru
        });

        const label = document.createElement('div');
        label.className = 'social-label';
        label.textContent = social.name;

        const stats = document.createElement('div');
        stats.className = 'social-stats';
        stats.textContent = social.stats;

        item.appendChild(icon);
        item.appendChild(label);
        item.appendChild(stats);

        ring.appendChild(item);
    });
}

function changeSpeed(speed) {
    const speeds = {
        slow: '60s',
        normal: '30s',
        fast: '15s'
    };
    ring.style.animationDuration = speeds[speed];
}

function toggleRotation() {
    isRotating = !isRotating;
    ring.style.animationPlayState = isRotating ? 'running' : 'paused';
}

function reverseRotation() {
    currentDirection *= -1;
    ring.style.animationDirection = currentDirection === 1 ? 'normal' : 'reverse';
}

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX - window.innerWidth / 2) / 100;
    const y = (e.clientY - window.innerHeight / 2) / 100;
    const container = document.querySelector('.container');
    container.style.transform = `rotateX(${-y}deg) rotateY(${x}deg)`;
});

createSocialIcons();

document.querySelectorAll('.social-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        ring.style.animationPlayState = 'paused';
    });
    
    item.addEventListener('mouseleave', () => {
        if (isRotating) {
            ring.style.animationPlayState = 'running';
        }
    });
});