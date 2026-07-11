(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ============================================================
     ICONS (inline SVG strings, reused across sections)
     ============================================================ */
  var ICONS = {
    heart: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-6.7-4.35-9.3-8.14C1 10.2 1.7 6.6 4.6 5.1 7 3.9 9.6 4.8 12 7.4c2.4-2.6 5-3.5 7.4-2.3 2.9 1.5 3.6 5.1 1.9 7.76C18.7 16.65 12 21 12 21z"/></svg>',
    clock: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    pin: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-6-5.5-6-10a6 6 0 1 1 12 0c0 4.5-6 10-6 10Z"/><circle cx="12" cy="11" r="2.5"/></svg>',
    phone: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    nikah: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V10l7-7 7 7v11M9 21v-6h6v6"/></svg>',
    lunch: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 2v7c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2V2M7 2v20M17 2v20M17 8h3a2 2 0 0 0 2-2V2"/></svg>',
    reception: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5.8 11.3 2 22l10.7-3.79M4 3h.01M22 4l-9 9M14.5 4a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0Z"/></svg>',
    dua: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 14a1 1 0 0 1 1-1c1 0 3 1.05 3 3v2M2 14a1 1 0 0 1 1-1c1 0 3 1.05 3 3v2M12.5 13.5V9M18 14a3 3 0 1 0-6 0"/></svg>',
    users: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    hands: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 14a1 1 0 0 1 1-1c1 0 3 1.05 3 3v2M2 14a1 1 0 0 1 1-1c1 0 3 1.05 3 3v2M12.5 13.5V9M18 14a3 3 0 1 0-6 0"/></svg>',
    gift: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/></svg>',
    together: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"/></svg>',
    whatsapp: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.28-.14-1.65-.81-1.9-.9-.26-.1-.44-.14-.63.14-.19.28-.72.9-.88 1.08-.16.19-.32.21-.6.07-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.38-1.64-1.54-1.92-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.49.14-.16.19-.28.28-.46.09-.19.05-.35-.02-.49-.07-.14-.63-1.53-.87-2.09-.23-.55-.46-.48-.63-.49h-.54c-.19 0-.49.07-.75.35-.26.28-.98.96-.98 2.34s1 2.72 1.14 2.91c.14.19 1.97 3.01 4.78 4.22.67.29 1.19.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.26-.19-.53-.33z"/><path d="M12 2a10 10 0 0 0-8.5 15.24L2 22l4.9-1.46A10 10 0 1 0 12 2Z"/></svg>'
  };

  var EVENT_ICONS = { nikah: ICONS.nikah, lunch: ICONS.lunch };
  var TIMELINE_ICONS = { nikah: ICONS.nikah, lunch: ICONS.lunch, reception: ICONS.reception, dua: ICONS.dua };
  var NOTE_ICONS = [ICONS.users, ICONS.hands, ICONS.gift, ICONS.together];
  var SOCIAL_ICONS = { whatsapp: ICONS.whatsapp };

  /* ============================================================
     NAV
     ============================================================ */
  function buildNav() {
    var desktop = document.getElementById("navLinks");
    var mobile = document.getElementById("mobileNavLinks");
    CONTENT.nav.forEach(function (item) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.label;
      li.appendChild(a);
      desktop.appendChild(li);

      var mLi = document.createElement("li");
      var mA = document.createElement("a");
      mA.href = item.href;
      mA.textContent = item.label;
      mA.addEventListener("click", function () { closeDrawer(); });
      mLi.appendChild(mA);
      mobile.appendChild(mLi);
    });
  }

  var drawer = document.getElementById("mobileDrawer");
  function openDrawer() { drawer.classList.add("open"); }
  function closeDrawer() { drawer.classList.remove("open"); }

  function wireNav() {
    document.getElementById("menuToggle").addEventListener("click", openDrawer);
    document.getElementById("menuClose").addEventListener("click", closeDrawer);

    var navbar = document.getElementById("navbar");
    window.addEventListener("scroll", function () {
      if (window.scrollY > 40) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
    });
  }

  /* ============================================================
     BISMILLAH INTRO
     ============================================================ */
  function wireIntro() {
    var intro = document.getElementById("bismillahIntro");
    document.getElementById("bismillahText").textContent = CONTENT.invitation.arabicVerse;
    document.getElementById("bismillahTranslation").textContent = CONTENT.invitation.arabicTranslation;

    // soft gold particles, matching the hero's
    var particlesEl = document.getElementById("introParticles");
    if (!reducedMotion) {
      var frag = document.createDocumentFragment();
      for (var i = 0; i < 24; i++) {
        var span = document.createElement("span");
        var size = (Math.random() * 2 + 1).toFixed(1);
        var duration = (Math.random() * 5 + 4).toFixed(1);
        var delay = (Math.random() * 4).toFixed(1);
        span.style.cssText =
          "position:absolute;left:" + (Math.random() * 100).toFixed(1) + "%;top:" +
          (Math.random() * 100).toFixed(1) + "%;width:" + size + "px;height:" + size +
          "px;border-radius:50%;background:#D4AF37;box-shadow:0 0 6px rgba(212,175,55,0.8);" +
          "animation:twinkle " + duration + "s ease-in-out " + delay + "s infinite;";
        frag.appendChild(span);
      }
      particlesEl.appendChild(frag);
    }

    var dismissed = false;
    function dismiss() {
      if (dismissed) return;
      dismissed = true;
      tryPlayAudio();
      intro.classList.add("fade-out");
      document.body.classList.remove("no-scroll");
      setTimeout(function () { intro.style.display = "none"; }, 950);
    }

    intro.addEventListener("click", dismiss);
    setTimeout(dismiss, reducedMotion ? 1400 : 4200);

    // Some browsers block autoplay even right after the intro; as a fallback,
    // start the music on the very first tap/click/keypress anywhere on the page.
    function firstInteractionPlay() {
      tryPlayAudio();
      document.removeEventListener("click", firstInteractionPlay);
      document.removeEventListener("touchstart", firstInteractionPlay);
      document.removeEventListener("keydown", firstInteractionPlay);
    }
    document.addEventListener("click", firstInteractionPlay);
    document.addEventListener("touchstart", firstInteractionPlay);
    document.addEventListener("keydown", firstInteractionPlay);
  }

  /* ============================================================
     AUDIO
     ============================================================ */
  var audio = document.getElementById("bgAudio");
  var musicOnIcon = document.getElementById("musicIconOn");
  var musicOffIcon = document.getElementById("musicIconOff");

  function setMusicIcon(playing) {
    musicOnIcon.style.display = playing ? "block" : "none";
    musicOffIcon.style.display = playing ? "none" : "block";
  }

  function tryPlayAudio() {
    if (audio && audio.paused) {
      audio.play().then(function () { setMusicIcon(true); }).catch(function () {});
    }
  }

  function wireAudio() {
    document.getElementById("musicToggle").addEventListener("click", function () {
      if (audio.paused) {
        audio.play().then(function () { setMusicIcon(true); }).catch(function () {});
      } else {
        audio.pause();
        setMusicIcon(false);
      }
    });
  }

  /* ============================================================
     HERO CONTENT
     ============================================================ */
  function fillHero() {
    document.getElementById("heroBlessing").textContent = CONTENT.meta.blessing;
    document.getElementById("heroGroom1").textContent = CONTENT.coupleOne.groom;
    document.getElementById("heroBride1").textContent = CONTENT.coupleOne.bride;
    document.getElementById("heroGroom2").textContent = CONTENT.coupleTwo.groom;
    document.getElementById("heroBride2").textContent = CONTENT.coupleTwo.bride;

    document.getElementById("heroDay").textContent = CONTENT.date.day;
    document.getElementById("heroGregorian").textContent = CONTENT.date.gregorian;
    document.getElementById("heroHijri").textContent = CONTENT.date.hijri;
    document.getElementById("heroSchedule").textContent = CONTENT.date.schedule;

    document.getElementById("heroVenueLabel").textContent = CONTENT.venue.name + ", " + CONTENT.venue.place;
  }

  function buildIslamicPattern() {
    var el = document.getElementById("islamicPattern");
    el.innerHTML =
      '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><pattern id="islamicTile" width="80" height="80" patternUnits="userSpaceOnUse">' +
      '<g stroke="#D4AF37" stroke-width="0.8" fill="none">' +
      '<circle cx="40" cy="40" r="18"/>' +
      '<path d="M40 12 L58 40 L40 68 L22 40 Z"/>' +
      '<path d="M22 22 L58 22 L58 58 L22 58 Z"/>' +
      "</g></pattern></defs>" +
      '<rect width="100%" height="100%" fill="url(#islamicTile)"/></svg>';
  }

  function buildParticles() {
    var el = document.getElementById("heroParticles");
    if (reducedMotion) return;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 34; i++) {
      var span = document.createElement("span");
      var size = (Math.random() * 2.5 + 1).toFixed(1);
      var duration = (Math.random() * 6 + 5).toFixed(1);
      var delay = (Math.random() * 5).toFixed(1);
      span.style.cssText =
        "position:absolute;left:" + (Math.random() * 100).toFixed(1) + "%;top:" +
        (Math.random() * 100).toFixed(1) + "%;width:" + size + "px;height:" + size +
        "px;border-radius:50%;background:#D4AF37;box-shadow:0 0 6px rgba(212,175,55,0.8);" +
        "animation:twinkle " + duration + "s ease-in-out " + delay + "s infinite;";
      frag.appendChild(span);
    }
    el.appendChild(frag);
  }

  /* ============================================================
     INVITATION + COUNTDOWN
     ============================================================ */
  function fillInvitation() {
    document.getElementById("arabicVerse").textContent = CONTENT.invitation.arabicVerse;
    document.getElementById("arabicTranslation").textContent = CONTENT.invitation.arabicTranslation;
    document.getElementById("invitationMessage").textContent = CONTENT.invitation.message;

    document.getElementById("countdownHeading").textContent = CONTENT.countdown.heading;
    document.getElementById("countdownSub").textContent = CONTENT.countdown.subheading;

    var notesEl = document.getElementById("countdownNotes");
    CONTENT.countdown.notes.forEach(function (note, i) {
      var div = document.createElement("div");
      div.className = "countdown-note";
      div.innerHTML =
        NOTE_ICONS[i % NOTE_ICONS.length] +
        '<span class="title">' + note.title + "</span>" +
        '<span class="text">' + note.text + "</span>";
      notesEl.appendChild(div);
    });
  }

  function startCountdown() {
    var target = new Date(CONTENT.date.iso).getTime();
    var daysEl = document.getElementById("cdDays");
    var hoursEl = document.getElementById("cdHours");
    var minutesEl = document.getElementById("cdMinutes");
    var secondsEl = document.getElementById("cdSeconds");

    function pad(n) { return String(n).padStart(2, "0"); }

    function tick() {
      var diff = Math.max(0, target - Date.now());
      var days = Math.floor(diff / 86400000);
      var hours = Math.floor((diff / 3600000) % 24);
      var minutes = Math.floor((diff / 60000) % 60);
      var seconds = Math.floor((diff / 1000) % 60);
      daysEl.textContent = pad(days);
      hoursEl.textContent = pad(hours);
      minutesEl.textContent = pad(minutes);
      secondsEl.textContent = pad(seconds);
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ============================================================
     OUR COUPLES
     ============================================================ */
  function couplesCardHTML(c, index) {
    return (
      '<div class="glass-card islamic-frame couple-card reveal ' + (index === 1 ? "delay-1" : "") + '">' +
      '<div class="couple-card-inner animate-float" style="animation-delay:' + index * 0.6 + 's">' +
      (c.label ? '<span class="couple-tag">' + c.label + "</span>" : "") +
      '<div class="couple-emblem"><svg width="44" height="44" viewBox="0 0 48 48" fill="none"><path d="M24 4 L28 20 L44 24 L28 28 L24 44 L20 28 L4 24 L20 20 Z" fill="#D4AF37" opacity="0.85"/></svg></div>' +
      '<h3 class="script-name" style="font-size:30px;">' + c.groom + "</h3>" +
      '<p class="father-name">' + c.groomFather + "</p>" +
      '<div style="margin:12px 0;color:var(--maroon);">' + ICONS.heart + "</div>" +
      '<h3 class="script-name" style="font-size:30px;">' + c.bride + "</h3>" +
      '<p class="father-name">' + c.brideFather + "</p>" +
      '<div class="divider" style="margin:20px 0;"><span class="divider-line"></span><svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M9 0 L11 7 L18 9 L11 11 L9 18 L7 11 L0 9 L7 7 Z" fill="#D4AF37"/></svg><span class="divider-line"></span></div>' +
      '<p class="couple-verse">&ldquo;' + c.verse + '&rdquo;</p>' +
      '<p class="couple-verse-ref">' + c.verseReference + "</p>" +
      "</div></div>"
    );
  }

  function fillCouples() {
    var grid = document.getElementById("couplesGrid");
    grid.innerHTML = couplesCardHTML(CONTENT.coupleOne, 0) + couplesCardHTML(CONTENT.coupleTwo, 1);
  }

  /* ============================================================
     WEDDING DETAILS
     ============================================================ */
  function fillDetails() {
    var grid = document.getElementById("detailsGrid");
    grid.innerHTML = CONTENT.weddingEvents.map(function (ev) {
      return (
        '<div class="glass-card islamic-frame detail-card reveal">' +
        '<div class="detail-icon">' + (EVENT_ICONS[ev.id] || ICONS.nikah) + "</div>" +
        "<h3>" + ev.title + "</h3>" +
        '<div class="detail-row">' + ICONS.clock + "<span>" + ev.day + ", " + ev.date + " · " + ev.time + "</span></div>" +
        '<div class="detail-row muted">' + ICONS.pin + "<span>" + ev.venue + "</span></div>" +
        "</div>"
      );
    }).join("");
  }

  /* ============================================================
     TIMELINE
     ============================================================ */
  function fillTimeline() {
    var wrap = document.getElementById("timelineSteps");
    wrap.innerHTML = CONTENT.timeline.map(function (step) {
      return (
        '<div class="timeline-step reveal">' +
        '<div class="timeline-icon">' + (TIMELINE_ICONS[step.id] || ICONS.nikah) + "</div>" +
        '<div class="glass-card timeline-body">' +
        '<span class="time">' + step.time + "</span>" +
        "<h3>" + step.title + "</h3>" +
        "<p>" + step.description + "</p>" +
        "</div></div>"
      );
    }).join("");
  }

  /* ============================================================
     VENUE
     ============================================================ */
  function fillVenue() {
    document.getElementById("venueMap").src = CONTENT.venue.mapEmbedUrl;
    document.getElementById("venueTitle").textContent = CONTENT.venue.name + ", " + CONTENT.venue.place;
    document.getElementById("venueAddress").textContent = CONTENT.venue.fullAddress;
    document.getElementById("venueMapBtn").href = CONTENT.venue.mapLink;
    document.getElementById("venueDirectionsBtn").href = CONTENT.venue.directionsLink;
  }

  /* ============================================================
     FAMILY
     ============================================================ */
  function familyCardHTML(f, index) {
    var phoneRow = f.phone
      ? '<div class="family-row">' + ICONS.phone + "<span>" + f.phone + "</span></div>"
      : "";
    return (
      '<div class="glass-card islamic-frame family-card reveal ' + (index === 1 ? "delay-1" : index === 2 ? "delay-2" : "") + '">' +
      '<p class="heading">' + f.heading + "</p>" +
      '<div class="divider" style="margin-top:14px;"><span class="divider-line"></span><svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M9 0 L11 7 L18 9 L11 11 L9 18 L7 11 L0 9 L7 7 Z" fill="#D4AF37"/></svg><span class="divider-line"></span></div>' +
      "<h3>" + f.hosts + "</h3>" +
      '<div class="family-row">' + ICONS.pin + "<span>" + f.address + "</span></div>" +
      phoneRow +
      "</div>"
    );
  }

  function fillFamily() {
    var grid = document.getElementById("familyGrid");
    grid.innerHTML =
      familyCardHTML(CONTENT.family.groomsFamily, 0) +
      familyCardHTML(CONTENT.family.bride1Family, 1) +
      familyCardHTML(CONTENT.family.bride2Family, 2);
  }

  /* ============================================================
     FOOTER
     ============================================================ */
  function fillFooter() {
    document.getElementById("footerThanks").textContent = CONTENT.footer.thankYou;
    document.getElementById("footerClosing").textContent = CONTENT.footer.closing;
    document.getElementById("footerSignature").textContent = CONTENT.footer.signature;
    document.getElementById("footerYear").textContent = new Date().getFullYear();

    var socials = document.getElementById("footerSocials");
    CONTENT.footer.socials.forEach(function (s) {
      var a = document.createElement("a");
      a.href = s.href;
      a.setAttribute("aria-label", s.platform);
      a.innerHTML = SOCIAL_ICONS[s.platform] || "";
      socials.appendChild(a);
    });
  }

  /* ============================================================
     SCROLL REVEAL
     ============================================================ */
  function wireReveal() {
    var els = document.querySelectorAll(".reveal");
    if (reducedMotion || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in-view"); });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach(function (el) { observer.observe(el); });
  }

  /* ============================================================
     SMOOTH SCROLL (Lenis)
     ============================================================ */
  function initLenis() {
    if (reducedMotion || typeof Lenis === "undefined") return;
    var lenis = new Lenis({ duration: 1.2, smoothWheel: true, touchMultiplier: 1.2 });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  /* ============================================================
     GSAP — subtle parallax drift on the hero glow orbs
     ============================================================ */
  function initGSAP() {
    if (reducedMotion || typeof gsap === "undefined") return;
    gsap.utils.toArray(".glow-orb").forEach(function (orb, i) {
      gsap.to(orb, {
        y: i % 2 === 0 ? 30 : -30,
        duration: 6 + i,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }

  /* ============================================================
     INIT
     ============================================================ */
  document.addEventListener("DOMContentLoaded", function () {
    buildNav();
    wireNav();
    wireAudio();
    wireIntro();

    fillHero();
    buildIslamicPattern();
    buildParticles();

    fillInvitation();
    startCountdown();

    fillCouples();
    fillDetails();
    fillTimeline();
    fillVenue();
    fillFamily();
    fillFooter();

    wireReveal();
    initLenis();
    initGSAP();
  });
})();
