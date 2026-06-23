# 🎮 Dijital Oda - İnteraktif Portfolyo

![Dijital Oda](https://img.shields.io/badge/Status-Canl%C4%B1-success?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

**[🔥 Canlı Demoyu İncelemek İçin Tıklayın](https://mehmetturuncx.github.io/internet_programlama_final_projesi_26/)**

"Dijital Oda", standart ve sıkıcı web portfolyolarına alternatif olarak geliştirilmiş, **pixel-art** tarzında ve tamamıyla interaktif, 2 boyutlu bir odadır. Odaya giren ziyaretçiler eşyalara tıklayarak projelerimi inceleyebilir, terminalde kod yazabilir, gizli "Easter Egg"leri bulabilir ve başarımlar kazanabilirler.

---

## ✨ Özellikler

*   **🕹️ İnteraktif Eşyalar:** 
    *   **Bilgisayar (Terminal):** Gerçek komutlarla (`ls`, `cat`, `whoami`, `clear`) çalışan, sekme (Tab) ile otomatik tamamlama ve geçmiş okları (↑ ↓) desteği sunan terminal.
    *   **Kitaplık (Filmler):** Letterboxd üzerinden RSS ile çekilen son izlediğim filmler vitrini.
    *   **Hoparlör (Radyo):** Arka planda dinlendirici bir Lofi müzik açıp kapatabilme.
    *   **Klasörler (Projeler):** Geliştirdiğim projeler, kullanılan diller ve Github benzeri bir arayüz.
    *   **Kalemlik (Hakkımda):** İletişim bilgilerim ve hakkımda detaylar.
*   **🏆 Başarım Sistemi (Achievements):** Xbox/PlayStation tarzı "Başarım Kazanıldı" bildirimleri! Radyoyu açmak, terminali ilk kez kurcalamak veya gizemleri çözmek size kupalar kazandırır.
*   **🐍 Terminalde Yılan Oyunu:** Terminale `play snake` komutunu yazarak entegre ve akıcı (lag-free) yılan oyununu oynayabilirsiniz.
*   **💥 Easter Egg'ler:** Terminalde `sudo rm -rf /` yazıp işletim sistemini silmeye çalışırsanız ne olacağını kendiniz görün (Sürpriz: Mavi ekran ve özel başarım!).
*   **🌙 Gece / Gündüz Modu:** Odanın atmosferini tek tuşla değiştirebilirsiniz. Gece modu aktif edildiğinde her pencere ve arayüz buna uygun olarak (Everforest Dark / Light tarzında) renk değiştirir.
*   **⚡ Ultra Optimize:** Tüm pixel-art görseller kalite kaybı yaşanmadan sıkıştırılmış, oyun ve animasyon döngüleri (Render Loops) donanımı yormayacak şekilde (React Refs kullanılarak) optimize edilmiştir.

---

## 🚀 Kurulum & Çalıştırma (Geliştiriciler İçin)

Projeyi kendi bilgisayarınızda çalıştırmak isterseniz:

1.  **Projeyi klonlayın:**
    ```bash
    git clone https://github.com/mehmetturuncx/internet_programlama_final_projesi_26.git
    ```
2.  **Klasöre girin:**
    ```bash
    cd internet_programlama_final_projesi_26
    ```
3.  **Gereksinimleri yükleyin:**
    ```bash
    npm install
    ```
4.  **Geliştirme sunucusunu başlatın:**
    ```bash
    npm run dev
    ```

---

## 🛠️ Kullanılan Teknolojiler

*   **Core:** React.js, Vite
*   **Styling:** Vanilla CSS (CSS Variables, Keyframe Animations)
*   **İkonlar:** `react-icons`
*   **Mantık & Optimizasyon:** Gelişmiş React Hooks (`useRef`, `useCallback`, `useEffect`), Custom Game Loops.
*   **Deployment:** GitHub Pages (GitHub Actions ile)
