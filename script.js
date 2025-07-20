document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navUl = document.querySelector('nav ul');
  
  mobileMenuBtn.addEventListener('click', function() {
    navUl.classList.toggle('show');
    this.setAttribute('aria-expanded', navUl.classList.contains('show'));
  });
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        if (navUl.classList.contains('show')) {
          navUl.classList.remove('show');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
  
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      window.scrollTo({
        top: document.querySelector('#features').offsetTop - 80,
        behavior: 'smooth'
      });
    });
  }
  
  const testimonials = document.querySelectorAll('.testimonial');
  const dotsContainer = document.querySelector('.carousel-dots');
  let currentTestimonial = 0;
  
  testimonials.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showTestimonial(index));
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.carousel-dot');
  
  function showTestimonial(index) {
    testimonials[currentTestimonial].classList.remove('active');
    dots[currentTestimonial].classList.remove('active');
    
    currentTestimonial = (index + testimonials.length) % testimonials.length;
    
    testimonials[currentTestimonial].classList.add('active');
    dots[currentTestimonial].classList.add('active');
  }
  
  document.querySelector('.carousel-prev').addEventListener('click', () => {
    showTestimonial(currentTestimonial - 1);
  });
  
  document.querySelector('.carousel-next').addEventListener('click', () => {
    showTestimonial(currentTestimonial + 1);
  });
  
  let testimonialInterval = setInterval(() => {
    showTestimonial(currentTestimonial + 1);
  }, 5000);
  
  const carousel = document.querySelector('.testimonial-carousel');
  carousel.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
  });
  
  carousel.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(() => {
      showTestimonial(currentTestimonial + 1);
    }, 5000);
  });
  
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const isActive = question.classList.contains('active');
      
      faqQuestions.forEach(q => {
        q.classList.remove('active');
      });
      
      if (!isActive) {
        question.classList.add('active');
      }
    });
  });
  
  const applicationForm = document.getElementById('application-form');
  const formSuccess = document.getElementById('form-success');
  
  if (applicationForm) {
    applicationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      setTimeout(() => {
        applicationForm.style.display = 'none';
        formSuccess.style.display = 'block';
      }, 1000);
    });
  }
  
  const chatBtn = document.querySelector('.floating-chat-btn');
  const chatWindow = document.querySelector('.chat-window');
  const closeChat = document.querySelector('.close-chat');
  const chatInput = document.getElementById('chat-input-field');
  const sendChatBtn = document.getElementById('send-chat-btn');
  const chatMessages = document.querySelector('.chat-messages');
  
  const botResponses = [
  "Great question! Our courses start every month. Would you like me to check availability for you?",
  "The beginner course runs for 8 weeks with two sessions per week.",
  "You'll learn computer basics, email, Microsoft Office, and more!",
  "Our instructors are patient and experienced with first-time tech users.",
  "The course costs $199, but we offer scholarships for those who qualify.",
  "You can apply right on our website! Would you like me to direct you to the application?",
  "Absolutely! Many of our students go on to get their first office jobs after completing the course.",
  "Yes, we offer certificates upon successful completion of each course.",
  "You can contact our support team anytime through the 'Contact Us' page.",
  "Our courses include practical exercises and real-world projects.",
  "Do you want details on our advanced or specialized courses?",
  "We have flexible payment plans available. Would you like me to share the options?",
  "Our course schedules are designed to fit around your work or study commitments.",
  "If you have any technical issues accessing the course, let me know and I can help.",
  "You can track your progress anytime by logging into your student dashboard.",
  "Are you interested in group training or corporate packages?",
  "Feel free to ask about any prerequisites for our courses.",
  "We also offer refresher courses if you want to update your skills.",
  "Would you like me to connect you with one of our course advisors for a personal consultation?"
];

  
  chatBtn.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
  });
  
  closeChat.addEventListener('click', () => {
    chatWindow.classList.remove('active');
  });
  
  function addBotMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', 'bot');
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', 'user');
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  sendChatBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
      addUserMessage(message);
      chatInput.value = '';
      
      setTimeout(() => {
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        addBotMessage(randomResponse);
      }, 1000);
    }
  }
  
  setTimeout(() => {
    addBotMessage("Hi there! I'm NudleBot. How can I help you today?");
  }, 2000);
  
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.highlight, .testimonials, .faq, .cta-section');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  document.querySelectorAll('.highlight, .testimonials, .faq, .cta-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();
});
