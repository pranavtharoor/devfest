window.onload = () => {
  [...document.querySelectorAll('.scroll-link'), ...document.querySelectorAll('nav > div')].forEach(el => el.addEventListener('click', e => {
    if (sections.filter(section => section.id === e.target.getAttribute('data-scroll')).length > 0) {
      sections
        .filter(section => section.id === e.target.getAttribute('data-scroll'))[0]
        .element
        .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
      currentSection = sections.map(section => section.id).indexOf(e.target.getAttribute('data-scroll'));
      document.querySelector('.to-top').style.display = 'block';
      if(![...document.querySelector('nav').classList].includes('nav-mobile'))
        document.querySelector('nav').classList.add('nav-mobile');
        document.querySelector('.menu-button').style.display = 'block';
      document.querySelector('.menu-button').classList.remove('open');
      document.querySelector('.light-box').style.zIndex = 0;
      document.querySelector('.light-box').style.opacity = 0;
      document.querySelector('nav').style.width = 0;
      [...document.querySelector('.menu-button').children].forEach(el => {
        el.style.backgroundColor = !!sections[currentSection].slide ? 'var(--color-light)' : 'var(--color-dark)';
      });
    }
  }));
  document.querySelector('.light-box').addEventListener('click', () => {
    document.querySelector('.menu-button').classList.remove('open');
    document.querySelector('.light-box').style.zIndex = 0;
    document.querySelector('.light-box').style.opacity = 0;
    document.querySelector('nav').style.width = 0;
    [...document.querySelector('.menu-button').children].forEach(el => {
      el.style.backgroundColor = !!sections[currentSection].slide ? 'var(--color-light)' : 'var(--color-dark)';
    });
  });
  document.querySelector('.to-top').addEventListener('click', () => {
    sections[0].element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    currentSection = 0;
    document.querySelector('.to-top').style.display = 'none';
    document.querySelector('nav').classList.remove('nav-mobile');
    document.querySelector('.menu-button').style.display = 'none';
    document.querySelector('nav').style.width = 'auto';
  });
  document.querySelector('#landing .scroll-down').addEventListener('click', () => {
    sections[1].element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    currentSection = 1;
    document.querySelector('.to-top').style.display = 'block';
    document.querySelector('.menu-button').style.display = 'block';
  });
  document.querySelector('#contact')
  .addEventListener('mousemove', function(e) {
      document.querySelectorAll('.gdg-logo img').forEach(el => el.style.transform = `perspective(60px) rotateX(${
        ((window.innerHeight / 2 - e.pageY) / this.clientHeight * 5)
      }deg) rotateY(${
        -((window.innerWidth / 2 - e.pageX) / this.clientWidth * 5)
      }deg) translateZ(0) scale(1.0, 1.0)`);
  });
  var sections = [...document.querySelector('.scroll').children].reduce((acc, cur) => [...acc, ...([...cur.classList].includes('has-children') ? [...cur.children[0].children].map(ele => ({ element: ele, id: ele.getAttribute('id'), slide: true })) : [{ element: cur, id: cur.getAttribute('id') }])], []);
  var currentSection = 0;
  var scrolled = false;
  document.querySelector('.to-top').style.display = 'none';
  document.querySelector('.menu-button').addEventListener('click', () => {
    if([...document.querySelector('.menu-button').classList].includes('open')) {
      document.querySelector('.menu-button').classList.remove('open');
      document.querySelector('.light-box').style.zIndex = 0;
      document.querySelector('.light-box').style.opacity = 0;
      document.querySelector('nav').style.width = 0;
      [...document.querySelector('.menu-button').children].forEach(el => {
        el.style.backgroundColor = !!sections[currentSection].slide ? 'var(--color-light)' : 'var(--color-dark)';
      });
    }
    else {
      document.querySelector('.menu-button').classList.add('open');
      document.querySelector('.light-box').style.zIndex = 80;
      document.querySelector('.light-box').style.opacity = 1;
      document.querySelector('nav').style.width = 250;
      [...document.querySelector('.menu-button').children].forEach(el => {
        el.style.backgroundColor = 'var(--color-dark)';
      });
    }
  });
  window.addEventListener('wheel', function (e) {
    if(window.innerWidth <= 800)
      return;
    document.querySelector('.menu-button').classList.remove('open');
    document.querySelector('.light-box').style.zIndex = 0;
    document.querySelector('.light-box').style.opacity = 0;
    document.querySelector('nav').style.width = 0;
    document.querySelectorAll('.gdg-logo img').forEach(el => el.style.transform = 'none');
    if (e.deltaY < 0 && currentSection - 1 >= 0 && !scrolled) {
      scrolled = true;
      setTimeout(() => { scrolled = false }, 800);
      sections[--currentSection].element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    } else if (e.deltaY > 0 && currentSection + 1 < sections.length && !scrolled) {
      scrolled = true;
      e.stopImmediatePropagation();
      setTimeout(() => { scrolled = false }, 800);
      sections[++currentSection].element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
    [...document.querySelector('.menu-button').children].forEach(el => {
      el.style.backgroundColor = !!sections[currentSection].slide ? 'var(--color-light)' : 'var(--color-dark)';
    });
    if(currentSection === 0) {
      document.querySelector('.to-top').style.display = 'none';
      document.querySelector('nav').classList.remove('nav-mobile');
      document.querySelector('.menu-button').style.display = 'none';
      document.querySelector('nav').style.width = 'auto';
    } else {
      document.querySelector('.to-top').style.display = 'block';
      document.querySelector('nav').classList.add('nav-mobile');
      document.querySelector('.menu-button').style.display = 'block';
      document.querySelector('nav').style.width = 0;
    }
    if(currentSection === 6)
      [...document.querySelector('.menu-button').children].forEach(el => {
        el.style.backgroundColor = 'var(--color-light)';
      });
  });

  var startY, startX;
  window.addEventListener('touchstart', e => {
    startY = e.changedTouches[0].pageY;
    startX = e.changedTouches[0].pageX;
  });
  window.addEventListener('resize', () => {
    sections[currentSection].element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  });
  window.addEventListener('touchmove', e => {
    if([...e.target.classList].includes('card-right') || [...e.target.parentNode.classList].includes('card-right') || [...e.target.parentNode.parentNode.classList].includes('card-right'))
      return;
    document.querySelector('.menu-button').classList.remove('open');
    document.querySelector('.light-box').style.zIndex = 0;
    document.querySelector('.light-box').style.opacity = 0;
    document.querySelector('nav').style.width = 0;
    document.querySelectorAll('.gdg-logo img').forEach(el => el.style.transform = 'none');
    var changeY = startY - e.changedTouches[0].pageY
    var changeX = startX - e.changedTouches[0].pageX
    var change = Math.abs(changeX) > Math.abs(changeY) ? changeX : changeY
    if (change < 0 && currentSection - 1 >= 0 && !scrolled) {
      scrolled = true;
      setTimeout(() => { scrolled = false }, 500);
      sections[--currentSection].element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    } else if (change > 0 && currentSection + 1 < sections.length && !scrolled) {
      scrolled = true;
      setTimeout(() => { scrolled = false }, 500);
      sections[++currentSection].element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
    [...document.querySelector('.menu-button').children].forEach(el => {
      el.style.backgroundColor = !!sections[currentSection].slide ? 'var(--color-light)' : 'var(--color-dark)';
    });
    if(currentSection === 0) {
      document.querySelector('.to-top').style.display = 'none';
      document.querySelector('nav').classList.remove('nav-mobile');
      document.querySelector('.menu-button').style.display = 'none';
      document.querySelector('nav').style.width = 'auto';
    } else {
      document.querySelector('.to-top').style.display = 'block';
      document.querySelector('nav').classList.add('nav-mobile');
      document.querySelector('.menu-button').style.display = 'block';
      document.querySelector('nav').style.width = 0;
    }
    if(currentSection === 6)
      [...document.querySelector('.menu-button').children].forEach(el => {
        el.style.backgroundColor = 'var(--color-light)';
      });
  });
}
