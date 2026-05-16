const githubUsername = 'Rohal004';
const githubProfileUrl = `https://github.com/${githubUsername}`;
const contactEmail = 'rohaljamal12345@gmail.com';
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const fallbackProfile = {
  name: 'Rohal Jamal',
  bio: 'Aspiring Data Engineer, Google Certified Data Analyst, and developer who enjoys exploring data trends and clean interfaces.',
  avatar_url: 'https://avatars.githubusercontent.com/u/121616972?v=4',
  html_url: githubProfileUrl,
  public_repos: 22,
  followers: 0,
  following: 0,
  created_at: '2022-12-29T12:44:02Z',
  location: 'Available remotely',
  blog: '',
};

const fallbackRepos = [
  {
    name: 'Predicting-Insurance-Claim-Amounts',
    html_url: 'https://github.com/Rohal004/Predicting-Insurance-Claim-Amounts',
    description: 'Estimate the medical insurance claim amount based on personal data.',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-05-15T12:29:47Z',
    topics: ['machine-learning', 'regression', 'data-analysis'],
  },
  {
    name: 'Customer-Churn-Prediction-Bank-Customers-',
    html_url: 'https://github.com/Rohal004/Customer-Churn-Prediction-Bank-Customers-',
    description: 'Identify customers who are likely to leave the bank.',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-05-15T12:02:27Z',
    topics: ['classification', 'random-forest', 'data-science'],
  },
  {
    name: 'Exploring-and-Visualizing-a-simple-dataset',
    html_url: 'https://github.com/Rohal004/Exploring-and-Visualizing-a-simple-dataset',
    description: 'Visualize and inspect the Iris dataset with pandas, matplotlib, and seaborn.',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-05-15T10:07:00Z',
    topics: ['visualization', 'pandas', 'seaborn'],
  },
  {
    name: 'Foddie',
    html_url: 'https://github.com/Rohal004/Foddie',
    description: 'A food delivery app.',
    language: 'Dart',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2025-10-28T17:47:49Z',
    topics: ['flutter', 'mobile-app'],
  },
];

const profileHighlights = [
  'Having insights of Java with Data Structures and Algorithm.',
  'On expedition to become a Data Engineer.',
  'Google Certified Data Analyst.',
  'Enjoys exploring data and discovering useful trends.',
  'Actively learning across Data Science and modern web experiences.',
];

const skillData = [
  { name: 'Data Analysis', level: 90 },
  { name: 'Data Engineering', level: 82 },
  { name: 'Python & ML Workflows', level: 88 },
  { name: 'Java & DSA', level: 80 },
  { name: 'Frontend Development', level: 76 },
];

const skillChips = ['Python', 'Java', 'JavaScript', 'HTML5', 'CSS3', 'PHP', 'MySQL', 'Apache', 'Pandas', 'Seaborn'];

const elements = {
  loader: document.querySelector('.loader'),
  heroBio: document.querySelector('#hero-bio'),
  heroStats: document.querySelector('#hero-stats'),
  profileAvatar: document.querySelector('#profile-avatar'),
  profileName: document.querySelector('#profile-name'),
  profileTagline: document.querySelector('#profile-tagline'),
  profileHighlights: document.querySelector('#profile-highlights'),
  profileDetails: document.querySelector('#profile-details'),
  aboutPoints: document.querySelector('#about-points'),
  projectsGrid: document.querySelector('#projects-grid'),
  githubOverview: document.querySelector('#github-overview'),
  skillBars: document.querySelector('#skill-bars'),
  skillChips: document.querySelector('#skill-chips'),
  contactForm: document.querySelector('#contact-form'),
  formStatus: document.querySelector('#form-status'),
  themeToggle: document.querySelector('.theme-toggle'),
  themeIcon: document.querySelector('.theme-toggle__icon'),
  navToggle: document.querySelector('.nav__toggle'),
  navLinks: document.querySelector('[data-nav-links]'),
  year: document.querySelector('#year'),
};

function formatDate(dateString) {
  return new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(dateString));
}

function yearsOnGitHub(dateString) {
  const joined = new Date(dateString);
  const diff = Date.now() - joined.getTime();
  return Math.max(1, Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)));
}

function setTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem('portfolio-theme', theme);
  elements.themeIcon.textContent = theme === 'light' ? '☾' : '☀';
}

function initializeTheme() {
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  setTheme(savedTheme || (prefersLight ? 'light' : 'dark'));

  elements.themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  });
}

function initializeNavigation() {
  elements.navToggle.addEventListener('click', () => {
    const isOpen = elements.navLinks.classList.toggle('is-open');
    document.body.classList.toggle('nav-open', isOpen);
    elements.navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  elements.navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      elements.navLinks.classList.remove('is-open');
      document.body.classList.remove('nav-open');
      elements.navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function populateProfile(profile) {
  elements.profileAvatar.src = profile.avatar_url || fallbackProfile.avatar_url;
  elements.profileName.textContent = profile.name || fallbackProfile.name;
  elements.profileTagline.textContent = profile.bio || fallbackProfile.bio;
  elements.heroBio.textContent = profile.bio || fallbackProfile.bio;

  const stats = [
    { value: profile.public_repos ?? fallbackProfile.public_repos, label: 'Public repos' },
    { value: yearsOnGitHub(profile.created_at || fallbackProfile.created_at), label: 'Years on GitHub' },
    { value: profile.followers ?? fallbackProfile.followers, label: 'Followers' },
  ];

  elements.heroStats.innerHTML = stats
    .map(
      (item) => `
        <li class="glass-card tilt-card">
          <strong>${item.value}</strong>
          <span>${item.label}</span>
        </li>
      `,
    )
    .join('');

  elements.profileHighlights.innerHTML = profileHighlights
    .map(
      (highlight) => `
        <article>
          <h3>${highlight}</h3>
        </article>
      `,
    )
    .join('');

  const details = [
    ['Profile', `<a href="${profile.html_url || githubProfileUrl}" target="_blank" rel="noreferrer">@${githubUsername}</a>`],
    ['Location', profile.location || 'Open to remote opportunities'],
    ['Joined GitHub', formatDate(profile.created_at || fallbackProfile.created_at)],
    ['Followers / Following', `${profile.followers ?? fallbackProfile.followers} / ${profile.following ?? fallbackProfile.following}`],
  ];

  elements.profileDetails.innerHTML = details
    .map(
      ([label, value]) => `
        <div>
          <dt>${label}</dt>
          <dd>${value}</dd>
        </div>
      `,
    )
    .join('');

  elements.aboutPoints.innerHTML = profileHighlights.map((point) => `<li>${point}</li>`).join('');

  elements.githubOverview.innerHTML = `
    <p><strong>${profile.name || fallbackProfile.name}</strong></p>
    <p>${profile.bio || fallbackProfile.bio}</p>
    <div class="repo-card__meta">
      <span>${profile.public_repos ?? fallbackProfile.public_repos} repositories</span>
      <span>${profile.followers ?? fallbackProfile.followers} followers</span>
      <span>${profile.following ?? fallbackProfile.following} following</span>
    </div>
    <p class="muted">Live GitHub data is loaded from the public API with a local fallback to keep the portfolio reliable on GitHub Pages.</p>
  `;
}

function populateRepos(repositories) {
  const repos = repositories.length ? repositories : fallbackRepos;
  const visibleRepos = repos
    .filter((repo) => !repo.fork)
    .slice(0, 6);

  elements.projectsGrid.innerHTML = visibleRepos
    .map((repo) => {
      const topics = (repo.topics || []).slice(0, 3);
      return `
        <article class="glass-card repo-card tilt-card">
          <div class="repo-card__top">
            <a class="repo-card__name" href="${repo.html_url}" target="_blank" rel="noreferrer">${repo.name}</a>
            <span>${repo.language || 'Multi-stack'}</span>
          </div>
          <p>${repo.description || 'Project details available on GitHub.'}</p>
          <div class="repo-card__topics">
            ${topics.length ? topics.map((topic) => `<span>${topic}</span>`).join('') : '<span>github-project</span>'}
          </div>
          <div class="repo-card__footer">
            <div class="repo-card__meta">
              <span>★ ${repo.stargazers_count ?? 0}</span>
              <span>⑂ ${repo.forks_count ?? 0}</span>
            </div>
            <span>Updated ${formatDate(repo.updated_at)}</span>
          </div>
        </article>
      `;
    })
    .join('');
}

function initializeAvatarFallback() {
  elements.profileAvatar.addEventListener('error', () => {
    elements.profileAvatar.style.opacity = '0';
  });

  elements.profileAvatar.addEventListener('load', () => {
    elements.profileAvatar.style.opacity = '1';
  });
}

function populateSkills() {
  elements.skillBars.innerHTML = skillData
    .map(
      (skill) => `
        <div class="skill-bar">
          <div class="skill-bar__header">
            <strong>${skill.name}</strong>
            <span>${skill.level}%</span>
          </div>
          <div class="skill-bar__track">
            <div class="skill-bar__fill" data-level="${skill.level}"></div>
          </div>
        </div>
      `,
    )
    .join('');

  elements.skillChips.innerHTML = skillChips.map((skill) => `<span class="skill-chip">${skill}</span>`).join('');
}

function initializeSkillAnimations() {
  const fills = document.querySelectorAll('.skill-bar__fill');
  fills.forEach((fill) => {
    const level = Number(fill.dataset.level || 0);
    if (prefersReducedMotion || typeof gsap === 'undefined') {
      fill.style.width = `${level}%`;
      return;
    }

    gsap.to(fill, {
      width: `${level}%`,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: fill,
        start: 'top 90%',
      },
    });
  });
}

function initializeTiltCards() {
  document.querySelectorAll('.tilt-card').forEach((card) => {
    const reset = () => {
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
    };

    card.addEventListener('mousemove', (event) => {
      if (prefersReducedMotion) {
        return;
      }

      const bounds = card.getBoundingClientRect();
      const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -8;
      const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', reset);
    card.addEventListener('blur', reset, true);
  });
}

function initializeContactForm() {
  elements.contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(elements.contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const mailtoLink = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${body}`;

    window.location.href = mailtoLink;
    elements.formStatus.textContent = 'Opening your email client with a prefilled draft...';
  });
}

async function fetchGitHubData() {
  const endpoints = [
    `https://api.github.com/users/${githubUsername}`,
    `https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`,
  ];

  try {
    const [profileResponse, repoResponse] = await Promise.all(
      endpoints.map((endpoint) =>
        fetch(endpoint, {
          headers: {
            Accept: 'application/vnd.github+json',
          },
        }),
      ),
    );

    if (!profileResponse.ok || !repoResponse.ok) {
      throw new Error('GitHub API request failed');
    }

    const [profile, repositories] = await Promise.all([profileResponse.json(), repoResponse.json()]);
    return { profile, repositories };
  } catch (error) {
    return { profile: fallbackProfile, repositories: fallbackRepos };
  }
}

function initializeRevealAnimations() {
  if (prefersReducedMotion || typeof gsap === 'undefined') {
    return;
  }

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  gsap.from('.hero__content > *', {
    y: 24,
    opacity: 0,
    duration: 1,
    stagger: 0.12,
    ease: 'power3.out',
  });

  gsap.from('.hero__spotlight', {
    y: 40,
    opacity: 0,
    duration: 1.1,
    ease: 'power3.out',
    delay: 0.2,
  });

  document.querySelectorAll('.section').forEach((section) => {
    gsap.from(section.querySelectorAll('.section__intro, .glass-card, .repo-card'), {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
      },
      y: 26,
      opacity: 0,
      duration: 0.9,
      stagger: 0.08,
      ease: 'power2.out',
    });
  });
}

function initializeThreeScene() {
  if (typeof THREE === 'undefined') {
    return;
  }

  const canvas = document.querySelector('#scene-canvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 8);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !prefersReducedMotion });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const group = new THREE.Group();
  scene.add(group);

  const particleCount = window.innerWidth < 768 ? 160 : 300;
  const positions = new Float32Array(particleCount * 3);
  for (let index = 0; index < particleCount * 3; index += 1) {
    positions[index] = (Math.random() - 0.5) * 16;
  }

  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMaterial = new THREE.PointsMaterial({
    color: 0x7c93ff,
    size: window.innerWidth < 768 ? 0.05 : 0.07,
    transparent: true,
    opacity: 0.72,
  });
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  group.add(particles);

  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.35, 0.34, 120, 16),
    new THREE.MeshBasicMaterial({ color: 0x50d1ff, wireframe: true, transparent: true, opacity: 0.3 }),
  );
  knot.position.set(-2.4, 0.8, -1);
  group.add(knot);

  const orb = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.2, 1),
    new THREE.MeshBasicMaterial({ color: 0x9a6bff, wireframe: true, transparent: true, opacity: 0.24 }),
  );
  orb.position.set(2.5, -1, -0.5);
  group.add(orb);

  let pointerX = 0;
  let pointerY = 0;

  window.addEventListener('pointermove', (event) => {
    pointerX = (event.clientX / window.innerWidth - 0.5) * 0.8;
    pointerY = (event.clientY / window.innerHeight - 0.5) * 0.8;
  });

  window.addEventListener('scroll', () => {
    const scrollProgress = window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1);
    group.rotation.z = scrollProgress * 0.8;
  });

  const resize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener('resize', resize);

  const tick = () => {
    knot.rotation.x += 0.002;
    knot.rotation.y += 0.003;
    orb.rotation.x -= 0.0025;
    orb.rotation.y += 0.002;
    particles.rotation.y += 0.0008;

    group.rotation.x += (pointerY - group.rotation.x) * 0.03;
    group.rotation.y += (pointerX - group.rotation.y) * 0.03;

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };

  tick();
}

function finalizeLoading() {
  window.setTimeout(() => elements.loader.classList.add('is-hidden'), 450);
}

async function initializePortfolio() {
  initializeTheme();
  initializeNavigation();
  initializeAvatarFallback();
  populateSkills();
  initializeContactForm();
  elements.year.textContent = new Date().getFullYear();

  const { profile, repositories } = await fetchGitHubData();
  populateProfile(profile);
  populateRepos(repositories);

  initializeRevealAnimations();
  initializeSkillAnimations();
  initializeTiltCards();
  initializeThreeScene();
  finalizeLoading();
}

document.addEventListener('DOMContentLoaded', initializePortfolio);
