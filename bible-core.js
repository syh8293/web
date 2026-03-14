// 1. 성경 데이터 (모든 권수와 장수 정보를 담은 보물지도)
const bibleData = {
    "Genesis": { type: "구약", folder: "1 Genesis (창세기)", chapters: 50 },
    "Exodus": { type: "구약", folder: "2 Exodus (출애굽기)", chapters: 40 },
    "Leviticus": { type: "구약", folder: "3 Leviticus (레위기)", chapters: 27 },
    "Numbers": { type: "구약", folder: "4 Numbers (민수기)", chapters: 36 },
    "Deuteronomy": { type: "구약", folder: "5 Deuteronomy (신명기)", chapters: 34 },
    "Joshua": { type: "구약", folder: "6 Joshua (여호수아)", chapters: 24 },
    "Judges": { type: "구약", folder: "7 Judges (재판관기)", chapters: 21 },
    "Ruth": { type: "구약", folder: "8 Ruth (룻기)", chapters: 4 },
    "Samuel1": { type: "구약", folder: "9 Samuel1 (사무엘상)", chapters: 31 },
    "Samuel2": { type: "구약", folder: "10 Samuel2 (사무엘하)", chapters: 24 },
    "Kings1": { type: "구약", folder: "11 kings1 (열왕기상)", chapters: 22 },
    "Kings2": { type: "구약", folder: "12 Kings2 (열왕기하)", chapters: 25 },
    "Chronicles1": { type: "구약", folder: "13 Chronicles1 (역대기상)", chapters: 29 },
    "Chronicles2": { type: "구약", folder: "14 Chronicles2 (역대기하)", chapters: 36 },
    "Ezra": { type: "구약", folder: "15 Ezra (에스라)", chapters: 10 },
    "Nehemiah": { type: "구약", folder: "16 Nehemiah (느헤미야)", chapters: 13 },
    "Esther": { type: "구약", folder: "17 Esther (에스더)", chapters: 10 },
    "Job": { type: "구약", folder: "18 Job (욥기)", chapters: 42 },
    "Psalms": { type: "구약", folder: "19 Psalms (시편)", chapters: 150 },
    "Proverbs": { type: "구약", folder: "20 Proverbs (잠언)", chapters: 31 },
    "Ecclesiastes": { type: "구약", folder: "21 Ecclesiastes (전도서)", chapters: 12 },
    "Solomon": { type: "구약", folder: "22 Song of Solomon (솔로몬의 노래)", chapters: 8 },
    "Isaiah": { type: "구약", folder: "23 Isaiah (이사야)", chapters: 66 },
    "Jeremiah": { type: "구약", folder: "24 Jeremiah (예레미야)", chapters: 52 },
    "Lamentations": { type: "구약", folder: "25 Lamentations (애가)", chapters: 5 },
    "Ezekiel": { type: "구약", folder: "26 Ezekiel (에스겔)", chapters: 48 },
    "Daniel": { type: "구약", folder: "27 Daniel (다니엘)", chapters: 12 },
    "Hosea": { type: "구약", folder: "28 Hosea (호세아)", chapters: 14 },
    "Joel": { type: "구약", folder: "29 Joel (요엘)", chapters: 3 },
    "Amos": { type: "구약", folder: "30 Amos (아모스)", chapters: 9 },
    "Obadiah": { type: "구약", folder: "31 Obadiah (오바댜)", chapters: 1 },
    "Jonah": { type: "구약", folder: "32 Jonah (요나)", chapters: 4 },
    "Micah": { type: "구약", folder: "33 Micah (미카)", chapters: 7 },
    "Nahum": { type: "구약", folder: "34 Nahum (나훔)", chapters: 3 },
    "Habakkuk": { type: "구약", folder: "35 Habakuk (하박국)", chapters: 3 },
    "Zephaniah": { type: "구약", folder: "36 Zephaniah (스파냐)", chapters: 3 },
    "Haggai": { type: "구약", folder: "37 Haggai (학개)", chapters: 2 },
    "Zechariah": { type: "구약", folder: "38 Zechariah (스카랴)", chapters: 14 },
    "Malachi": { type: "구약", folder: "39 Malachi (말라키)", chapters: 4 },
    
    // 신약 (주요 권수만 예시로 넣었습니다. 나머지 27권도 동일하게 추가 가능합니다)
    "Matthew": { type: "신약", folder: "1 Matthew (마태복음)", chapters: 28 },
    "Mark": { type: "신약", folder: "2 Mark (마가복음)", chapters: 16 },
    "Luke": { type: "신약", folder: "3 Luke (누가복음)", chapters: 24 },
    "John": { type: "신약", folder: "4 John (요한복음)", chapters: 21 },
    "Acts": {type: "신약", folder: "5 Acts (사도행전)", chapters: 28},

    // ... 나머지 신약 목록도 여기에 추가하세요!
};

// 2. 페이지 로드 시 기능 실행
window.addEventListener('DOMContentLoaded', () => {
    // 이어 읽기 기록 저장
    localStorage.setItem('last_read_bible_url', window.location.href);
    localStorage.setItem('last_read_bible_title', document.title);

    // 헤더 메뉴 생성
    renderBibleHeader();
});

function renderBibleHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    header.style.backgroundColor = "#f8f9fa";
    header.style.padding = "10px";
    header.style.borderBottom = "2px solid #ddd";
    header.style.textAlign = "center";

    header.innerHTML = `
        <div style="display:flex; justify-content:center; align-items:center; gap:8px; flex-wrap:wrap;">
            <button onclick="changeFontSize(-2)" style="padding:8px; border-radius:5px;">A-</button>
            <select id="book-select" onchange="updateChapters()" style="padding:8px; border-radius:5px;"></select>
            <select id="chapter-select" style="padding:8px; border-radius:5px;"></select>
            <button onclick="goToSelectedPage()" style="padding:8px 15px; background:#555; color:white; border:none; border-radius:5px; font-weight:bold;">이동</button>
            <button onclick="changeFontSize(2)" style="padding:8px; border-radius:5px;">A+</button>
        </div>
    `;

    const bookSelect = document.getElementById('book-select');
    for (let key in bibleData) {
        let opt = document.createElement('option');
        opt.value = key;
        // 한글 이름만 추출 (예: "창세기")
        opt.innerText = bibleData[key].folder.match(/\(([^)]+)\)/)[1];
        bookSelect.appendChild(opt);
    }
    updateChapters();
}

function updateChapters() {
    const bookKey = document.getElementById('book-select').value;
    const chapterSelect = document.getElementById('chapter-select');
    chapterSelect.innerHTML = "";

    const totalChapters = bibleData[bookKey].chapters;
    for (let i = 0; i <= totalChapters; i++) {
        let opt = document.createElement('option');
        opt.value = i;
        opt.innerText = i === 0 ? "서론(0장)" : i + "장";
        chapterSelect.appendChild(opt);
    }
}

function goToSelectedPage() {
    const bookKey = document.getElementById('book-select').value;
    const chapter = document.getElementById('chapter-select').value;
    const info = bibleData[bookKey];
    
    // 질문자님의 GitHub 경로 규칙에 맞게 URL 생성
    const baseUrl = "https://syh8293.github.io/web/성경/";
    const url = `${baseUrl}${info.type}/${encodeURIComponent(info.folder)}/${bookKey}%20${chapter}.html`;
    
    location.href = url;
}

function changeFontSize(delta) {
    const body = document.body;
    const currentSize = parseFloat(window.getComputedStyle(body).fontSize);
    body.style.fontSize = (currentSize + delta) + "px";
}