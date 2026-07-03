// Default Data
const defaultNews = [
    {
        id: 1,
        title: "Pelayanan KTP Keliling di RW 03",
        segment: "Jadwal Pelayanan",
        date: "12 Agustus 2026",
        excerpt: "Bagi warga RW 03, layanan KTP keliling akan hadir di balai warga mulai pukul 08:00 hingga 12:00 WIB.",
        content: "Dalam rangka meningkatkan kemudahan administrasi bagi warga, Kelurahan Cibubur akan menyelenggarakan layanan KTP keliling yang dipusatkan di RW 03. Layanan ini akan beroperasi pada tanggal 12 Agustus 2026 mulai pukul 08:00 hingga 12:00 WIB di Balai Warga RW 03. Diharapkan bagi warga yang ingin mengurus KTP baru, perpanjangan, atau perubahan data agar membawa persyaratan lengkap seperti fotokopi KK, surat pengantar RT/RW, dan dokumen pendukung lainnya."
    },
    {
        id: 2,
        title: "Lomba Kebersihan Lingkungan Antar RT",
        segment: "Pengumuman",
        date: "10 Agustus 2026",
        excerpt: "Mari meriahkan HUT RI ke-81 dengan mengikuti lomba kebersihan lingkungan antar RT se-Kelurahan Cibubur.",
        content: "Menyambut Hari Ulang Tahun Kemerdekaan Republik Indonesia ke-81, Kelurahan Cibubur mengadakan Lomba Kebersihan Lingkungan antar RT. Penilaian akan difokuskan pada kebersihan jalan lingkungan, pengelolaan sampah, penghijauan, serta keindahan dekorasi kemerdekaan. Tim penilai dari Kelurahan dan Kecamatan akan turun ke lapangan secara acak pada minggu ketiga Agustus. RT dengan nilai tertinggi akan mendapatkan piala bergilir Lurah Cibubur dan hadiah dana pembinaan."
    },
    {
        id: 3,
        title: "Perbaikan Saluran Air di Jl. Raya Lapangan Tembak",
        segment: "Berita Kelurahan",
        date: "08 Agustus 2026",
        excerpt: "Dinas Bina Marga sedang melakukan perbaikan saluran air untuk menanggulangi genangan air di musim penghujan.",
        content: "Guna mengantisipasi datangnya musim penghujan, Dinas Bina Marga DKI Jakarta bekerjasama dengan Suku Dinas Sumber Daya Air (SDA) Jakarta Timur saat ini tengah melakukan pengerukan dan perbaikan gorong-gorong di sepanjang Jalan Raya Lapangan Tembak. Pengerjaan ini diperkirakan memakan waktu dua minggu. Kami memohon maaf atas ketidaknyamanan lalu lintas selama proses pengerjaan berlangsung dan menghimbau warga untuk mencari jalur alternatif bila memungkinkan."
    }
];

// Initialize localStorage if empty
if (!localStorage.getItem('cibubur_news')) {
    localStorage.setItem('cibubur_news', JSON.stringify(defaultNews));
} else {
    // Migration: remove image from existing data if it exists
    let existingNews = JSON.parse(localStorage.getItem('cibubur_news'));
    if (existingNews.length > 0 && existingNews[0].image) {
        existingNews = existingNews.map(item => {
            delete item.image;
            return item;
        });
        localStorage.setItem('cibubur_news', JSON.stringify(existingNews));
    }
}

// Function to render news on Homepage
function renderHomeNews() {
    const container = document.getElementById('home-news-container');
    if (!container) return;

    const news = JSON.parse(localStorage.getItem('cibubur_news')) || [];
    container.innerHTML = '';

    // Render up to 3 latest news
    news.slice(0, 3).forEach(item => {
        const card = document.createElement('div');
        card.className = 'news-card-horizontal';
        card.innerHTML = `
            <div class="news-content-horz">
                <div class="news-meta">
                    <span class="news-badge">${item.segment}</span>
                    <span class="news-date"><i class="fas fa-calendar-alt"></i> ${item.date}</span>
                </div>
                <h4>${item.title}</h4>
                <p>${item.excerpt}</p>
                <a href="detail-berita.html?id=${item.id}" class="read-more">Baca Selengkapnya <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        container.appendChild(card);
    });
}

// Function to render news on Berita page
function renderBeritaPage(filterSegment = 'Semua') {
    const container = document.getElementById('berita-page-container');
    if (!container) return;

    const news = JSON.parse(localStorage.getItem('cibubur_news')) || [];
    container.innerHTML = '';

    const filteredNews = filterSegment === 'Semua' 
        ? news 
        : news.filter(item => item.segment === filterSegment);

    const isLoggedin = localStorage.getItem('is_loggedin') === 'true';
    
    filteredNews.forEach(item => {
        let adminButtons = '';
        if (isLoggedin) {
            adminButtons = `
                <div style="display: flex; gap: 8px;">
                    <button class="edit-btn" data-id="${item.id}" style="background: transparent; border: 1px solid var(--border-color); color: var(--text-muted); padding: 6px 12px; font-size: 0.85rem; border-radius: 6px; cursor: pointer; transition: 0.3s;" onmouseover="this.style.color='var(--primary-color)'; this.style.borderColor='var(--primary-color)'" onmouseout="this.style.color='var(--text-muted)'; this.style.borderColor='var(--border-color)'" title="Edit Berita"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" data-id="${item.id}" style="background: transparent; border: 1px solid var(--border-color); color: var(--text-muted); padding: 6px 12px; font-size: 0.85rem; border-radius: 6px; cursor: pointer; transition: 0.3s;" onmouseover="this.style.color='#e74c3c'; this.style.borderColor='#e74c3c'" onmouseout="this.style.color='var(--text-muted)'; this.style.borderColor='var(--border-color)'" title="Hapus Berita"><i class="fas fa-trash"></i></button>
                </div>
            `;
        }

        const card = document.createElement('div');
        card.className = 'blog-card';
        card.innerHTML = `
            <div class="blog-content">
                <div class="news-meta" style="margin-bottom: 10px;">
                    <span class="blog-badge">${item.segment}</span>
                    <span class="blog-date"><i class="fas fa-calendar-alt"></i> ${item.date}</span>
                </div>
                <h3>${item.title}</h3>
                <p>${item.excerpt}</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <a href="detail-berita.html?id=${item.id}" class="btn btn-primary" style="margin-top:15px; padding:8px 20px;">Baca Artikel</a>
                    ${adminButtons}
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    // Attach event listeners to edit and delete buttons
    if (isLoggedin) {
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                if (confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
                    const news = JSON.parse(localStorage.getItem('cibubur_news')) || [];
                    const updatedNews = news.filter(n => n.id !== id);
                    localStorage.setItem('cibubur_news', JSON.stringify(updatedNews));
                    renderBeritaPage(filterSegment);
                    renderHomeNews(); // in case it was on home
                }
            });
        });

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                const news = JSON.parse(localStorage.getItem('cibubur_news')) || [];
                const article = news.find(n => n.id === id);
                
                if (article) {
                    document.getElementById('newsId').value = article.id;
                    document.getElementById('newsTitle').value = article.title;
                    document.getElementById('newsSegment').value = article.segment;
                    document.getElementById('newsContent').value = article.content || article.excerpt;
                    
                    if (article.image) {
                        document.getElementById('newsImageBase64').value = article.image;
                        document.getElementById('imagePreview').src = article.image;
                        document.getElementById('imagePreviewContainer').style.display = 'block';
                    } else {
                        document.getElementById('newsImageBase64').value = '';
                        document.getElementById('imagePreviewContainer').style.display = 'none';
                    }
                    if (document.getElementById('newsImageFile')) {
                        document.getElementById('newsImageFile').value = '';
                    }
                    
                    document.getElementById('modalTitle').innerText = 'Edit Berita';
                    document.getElementById('modalSubmitBtn').innerText = 'Simpan Perubahan';
                    
                    document.getElementById('addNewsModal').style.display = 'flex';
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderHomeNews();
    renderBeritaPage();

    // Filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderBeritaPage(e.target.innerText);
        });
    });

    // Setup Add News Modal (only accessible if logged in)
    const isLoggedin = localStorage.getItem('is_loggedin') === 'true';

    const addNewsBtn = document.getElementById('add-news-btn');
    const modal = document.getElementById('addNewsModal');
    const closeBtn = document.querySelector('.close-modal');
    const form = document.getElementById('addNewsForm');

    if (addNewsBtn && isLoggedin) {
        addNewsBtn.style.display = 'inline-flex';
        
        addNewsBtn.addEventListener('click', () => {
            // Reset for Add mode
            document.getElementById('addNewsForm').reset();
            document.getElementById('newsId').value = '';
            document.getElementById('newsImageBase64').value = '';
            document.getElementById('imagePreviewContainer').style.display = 'none';
            document.getElementById('modalTitle').innerText = 'Tambah Berita Baru';
            document.getElementById('modalSubmitBtn').innerText = 'Terbitkan Berita';
            modal.style.display = 'flex';
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target == modal) {
                modal.style.display = 'none';
            }
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const idInput = document.getElementById('newsId').value;
            const title = document.getElementById('newsTitle').value;
            const segment = document.getElementById('newsSegment').value;
            const image = document.getElementById('newsImageBase64').value;
            const content = document.getElementById('newsContent').value;
            
            // Format current date
            const dateObj = new Date();
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const formattedDate = dateObj.toLocaleDateString('id-ID', options);
            
            // Create excerpt from content
            const excerpt = content.length > 100 ? content.substring(0, 100) + "..." : content;

            let news = JSON.parse(localStorage.getItem('cibubur_news')) || [];
            
            if (idInput) {
                // Edit existing
                const index = news.findIndex(n => n.id === parseInt(idInput));
                if (index !== -1) {
                    news[index].title = title;
                    news[index].segment = segment;
                    news[index].excerpt = excerpt;
                    news[index].content = content;
                    if (image) {
                        news[index].image = image;
                    } else {
                        delete news[index].image;
                    }
                    // Keep original date or update? We'll keep original date.
                }
            } else {
                // Add new
                const newItem = {
                    id: Date.now(),
                    title: title,
                    segment: segment,
                    date: formattedDate,
                    excerpt: excerpt,
                    content: content
                };
                if (image) newItem.image = image;
                
                news.unshift(newItem); // Add to beginning
            }

            localStorage.setItem('cibubur_news', JSON.stringify(news));
            
            // Reset form and close modal
            form.reset();
            document.getElementById('newsId').value = '';
            modal.style.display = 'none';
            
            // Re-render
            const activeFilter = document.querySelector('.filter-btn.active').innerText;
            renderBeritaPage(activeFilter);
            renderHomeNews();
            
            alert(idInput ? "Berita berhasil diperbarui!" : "Berita berhasil ditambahkan!");
        });
    } else if (addNewsBtn) {
        addNewsBtn.style.display = 'none';
    }

    // Image File Reader setup
    const newsImageFile = document.getElementById('newsImageFile');
    const newsImageBase64 = document.getElementById('newsImageBase64');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const removeImageBtn = document.getElementById('removeImageBtn');

    if (newsImageFile) {
        newsImageFile.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    newsImageBase64.value = event.target.result;
                    imagePreview.src = event.target.result;
                    imagePreviewContainer.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });

        removeImageBtn.addEventListener('click', () => {
            newsImageFile.value = '';
            newsImageBase64.value = '';
            imagePreviewContainer.style.display = 'none';
        });
    }
});
