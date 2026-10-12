// ============================================================
// script.js — Portfolio ka saara interactive behavior yahan hai
//
// JavaScript page ko ACTIONS karwata hai:
// - Contact form ko validate (check) karna submit se pehle
// - Scroll karte time sahi nav link ko highlight karna
// - Certificate/Achievement image par click karne se use fullscreen me dikhana
//
// ISKO PADHNE KA TARIKA:
// - // se shuru hone wali lines "comments" hain — browser inko ignore karta hai
// - function naam() { ... } ek reusable code block define karta hai
// - document.getElementById('id') HTML element ko uske id="" se dhoondta hai
// - .value input field me user ne jo type kiya wo text deta hai
// - .trim() text ke start aur end ke extra spaces hata deta hai
// ============================================================


// ============================================================
// PART 1: CONTACT FORM — sendMessage()
//
// Jab user "Send Message" button click karta hai, ye function chalta hai.
// HTML me ye button se connect hai:
//   <button onclick="sendMessage()">Send Message</button>
// ============================================================

function sendMessage() {

  // Step 1: User ne har field me jo type kiya hai use nikalo
  var n = document.getElementById('cf-name').value.trim();    // Full Name
  var e = document.getElementById('cf-email').value.trim();   // Email Address
  var s = document.getElementById('cf-subject').value.trim(); // Subject
  var m = document.getElementById('cf-message').value.trim(); // Message

  // Step 2: Status div nikalo jaha success/error message dikhayenge
  var st = document.getElementById('form-status');

  // Step 3: Check karo koi field khaali to nahi hai
  // Agar koi bhi field khaali (empty) hai, to error dikhao aur RUK JAO
  if (!n || !e || !s || !m) {
    st.textContent = 'Please fill in all fields before sending.';
    st.className = 'form-status error'; // CSS se laal/red error styling add karta hai
    st.style.display = 'block';         // hidden div ko visible bana deta hai
    return; // STOP — function ke baaki code ko mat chalao
  }

  // Step 4: Email sahi format me hai ya nahi check karo
  // Pattern /^[^\s@]+@[^\s@]+\.[^\s@]+$/ check karta hai: text @ text . text
  // .test(e) true return karta hai agar email pattern se match hota hai
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
    st.textContent = 'Please enter a valid email address.';
    st.className = 'form-status error';
    st.style.display = 'block';
    return;
  }

  // Step 5: Email ka body text banao
  var body = 'Name: ' + n + '\nEmail: ' + e + '\n\n' + m;
  // \n = newline character (jaise Enter dabane se hota hai)

  // Step 6: User ka email app open karo, jisme saari details pehle se bhari ho
  // encodeURIComponent() special characters ko URL ke liye safe banata hai
  window.location.href = 'mailto:shahiraunak8@gmail.com?subject=' + encodeURIComponent(s) + '&body=' + encodeURIComponent(body);

  // Step 7: Success message dikhao
  st.textContent = 'Your mail client has been opened. Thank you!';
  st.className = 'form-status success'; // CSS se hara/green success styling add karta hai
  st.style.display = 'block';
}


// ============================================================
// PART 2: NAV ACTIVE LINK HIGHLIGHT
//
// Jab user scroll karta hai, ye sahi nav link ko highlight karta hai
// taaki pata chale woh kaunsa section dekh raha hai.
//
// window.addEventListener('scroll', function) ka matlab hai:
//   "jab bhi user scroll kare, ye function chalao"
// ============================================================

window.addEventListener('scroll', function () {

  // Saare sections nikalo jinke pass id hai (jaise id="about", id="projects")
  var secs = document.querySelectorAll('section[id]');

  // Saare nav links nikalo
  var nls = document.querySelectorAll('.nav-links a');

  // Track karo abhi kaunsa section visible hai
  var cur = '';

  // Har section me loop chalao aur check karo hum uske aage scroll kar chuke hain ya nahi
  secs.forEach(function (s) {
    // s.offsetTop = page ke top se is section tak ki distance
    // window.scrollY = user kitna scroll kar chuka hai (pixels me)
    // 100 minus karte hain taaki highlight thoda jaldi trigger ho (achha lagta hai)
    if (window.scrollY >= s.offsetTop - 100) {
      cur = s.id; // jaise 'about', 'experience', 'projects'
    }
  });

  // Har nav link me loop chalao
  nls.forEach(function (a) {
    // Color ko reset karo default par (khaali string = inline style hata do)
    a.style.color = '';

    // Agar ye link current section ki taraf point karta hai, to use green kar do
    // a.getAttribute('href') href value nikalta hai jaise '#about'
    // '#' + cur same format banata hai, jaise '#about'
    if (a.getAttribute('href') === '#' + cur) {
      a.style.color = 'var(--green)'; // hamare CSS variable ko use karta hai
    }
  });

});


// ============================================================
// PART 3: CERTIFICATE & ACHIEVEMENT IMAGE ZOOM — openImage()
//
// Jab visitor kisi certificate ya achievement image par click karta hai,
// ye function image ko fullscreen popup me bada karke dikhata hai.
//
// HTML me ye image tags se connect hai, jaise:
//   <img src="cert-isc2.jpg" class="cert-img-slot" onclick="openImage('cert-isc2.jpg')" />
//
// NOTE: Pehle ye function index.html ke andar <script> tag ke andar
// likha gaya tha jo galat tarika tha — wo kabhi chalta nahi hai.
// Ab ye sahi jagah par hai (script.js file ke andar) isliye CHALEGA.
// ============================================================

function openImage(src) {

  // Step 1: Dark background overlay (poora screen dark karne wala layer) banao
  var overlay = document.createElement('div');
  overlay.style.cssText =
    'position:fixed;' +
    'top:0; left:0;' +
    'width:100%; height:100%;' +
    'background:rgba(0,0,0,0.88);' +
    'z-index:99999;' +              // sabse upar dikhega
    'display:flex;' +
    'align-items:center;' +
    'justify-content:center;' +
    'cursor:pointer;';

  // Step 2: Bada certificate image banao
  var img = document.createElement('img');
  img.src = src;
  img.style.cssText =
    'max-width:88%;' +
    'max-height:88vh;' +
    'border-radius:10px;' +
    'box-shadow:0 24px 80px rgba(0,0,0,0.6);' +
    'cursor:default;';  // image par click karne se band nahi hoga, sirf bahar click karne se hoga

  // Step 3: ✕ close button banao (top right corner me)
  var closeBtn = document.createElement('div');
  closeBtn.textContent = '✕';
  closeBtn.style.cssText =
    'position:fixed;' +
    'top:22px; right:30px;' +
    'color:white;' +
    'font-size:2rem;' +
    'font-weight:bold;' +
    'cursor:pointer;' +
    'z-index:100000;' +
    'background:rgba(0,0,0,0.4);' +
    'width:44px; height:44px;' +
    'border-radius:50%;' +
    'display:flex;' +
    'align-items:center;' +
    'justify-content:center;' +
    'transition:background 0.2s;';

  // Step 4: Close button par hover effect
  closeBtn.onmouseover = function () {
    closeBtn.style.background = 'rgba(255,255,255,0.2)';
  };
  closeBtn.onmouseout = function () {
    closeBtn.style.background = 'rgba(0,0,0,0.4)';
  };

  // Step 5: Overlay ke dark background par click karne se popup band ho jaye
  overlay.onclick = function (event) {
    // Sirf tab band karo jab user ne dark background par click kiya ho, image par NAHI
    if (event.target === overlay) {
      document.body.removeChild(overlay);
    }
  };

  // Step 6: ✕ button par click karne se bhi popup band ho jaye
  closeBtn.onclick = function () {
    document.body.removeChild(overlay);
  };

  // Step 7: ESC key dabane se bhi popup band ho jaye
  document.addEventListener('keydown', function escClose(event) {
    if (event.key === 'Escape') {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
      // Listener ko hata do close hone ke baad, taaki dobara stack na ho
      document.removeEventListener('keydown', escClose);
    }
  });

  // Step 8: Sab kuch jod kar page me add karo
  overlay.appendChild(img);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);
}