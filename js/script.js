document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. スマホ用 ハンバーガーメニュー制御
     ========================================== */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-list a');

  if (hamburgerBtn && nav) {
    // ボタンクリックでメニュー開閉
    hamburgerBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
      hamburgerBtn.classList.toggle('active');
    });

    // リンクをクリックしたらメニューを閉じる
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        hamburgerBtn.classList.remove('active');
      });
    });
  }

  /* ==========================================
     2. メニューのカテゴリタブ切り替え機能
     ========================================== */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const menuItems = document.querySelectorAll('.menu-item');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // アクティブタブのスタイル切り替え
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedCategory = btn.getAttribute('data-category');

      // メニューの絞り込み表示
      menuItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (selectedCategory === 'all' || selectedCategory === itemCategory) {
          item.style.display = 'block';
          // フェードインアニメーション効果
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.opacity = '1';
          }, 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================
     3. お問い合わせフォームの入力チェック（バリデーション）
     ========================================== */
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const errorName = document.getElementById('error-name');
  const errorEmail = document.getElementById('error-email');
  const errorMessage = document.getElementById('error-message');

  // メールアドレス形式の検証用正規表現
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // 各フィールドの個別チェック関数
  const checkName = () => {
    if (nameInput.value.trim() === '') {
      errorName.textContent = 'お名前を入力してください。';
      nameInput.style.borderColor = '#e53e3e';
      return false;
    } else {
      errorName.textContent = '';
      nameInput.style.borderColor = '#dcd1c4';
      return true;
    }
  };

  const checkEmail = () => {
    const value = emailInput.value.trim();
    if (value === '') {
      errorEmail.textContent = 'メールアドレスを入力してください。';
      emailInput.style.borderColor = '#e53e3e';
      return false;
    } else if (!validateEmail(value)) {
      errorEmail.textContent = '正しいメールアドレスの形式で入力してください。';
      emailInput.style.borderColor = '#e53e3e';
      return false;
    } else {
      errorEmail.textContent = '';
      emailInput.style.borderColor = '#dcd1c4';
      return true;
    }
  };

  const checkMessage = () => {
    if (messageInput.value.trim() === '') {
      errorMessage.textContent = 'メッセージを入力してください。';
      messageInput.style.borderColor = '#e53e3e';
      return false;
    } else {
      errorMessage.textContent = '';
      messageInput.style.borderColor = '#dcd1c4';
      return true;
    }
  };

  // リアルタイムバリデーション（入力中にエラー解消を判定）
  if (nameInput) nameInput.addEventListener('input', checkName);
  if (emailInput) emailInput.addEventListener('input', checkEmail);
  if (messageInput) messageInput.addEventListener('input', checkMessage);

  // フォーム送信時の処理
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // デフォルトのページリロードを停止

      const isNameValid = checkName();
      const isEmailValid = checkEmail();
      const isMessageValid = checkMessage();

      // すべての項目が正常な場合のみ送信完了処理
      if (isNameValid && isEmailValid && isMessageValid) {
        alert('お問い合わせありがとうございます。送信が完了いたしました。');
        form.reset(); // フォームをクリア
      }
    });
  }

});