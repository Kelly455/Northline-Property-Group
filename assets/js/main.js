/* Northline Property Group real estate template — vanilla JS enhancements.
   The listing grid is also rendered as static HTML, so the page works without JS.
   Edit LISTINGS below to change the demo properties (price in USD; rent = per month). */

(function () {
  'use strict';

  var LISTINGS = [
    {
      id: 1,
      title: 'Modern family home with garden studio',
      address: '14 Linden Crescent',
      city: 'Northfield',
      type: 'house',
      status: 'sale',
      price: 1285000,
      beds: 4,
      baths: 3,
      area: 2860,
      year: 2019,
      lot: 6200,
      garage: 2,
      img: 'house-modern.jpg',
      gallery: [
        { img: 'room-living.jpg', alt: 'Living room' },
        { img: 'room-kitchen.jpg', alt: 'Kitchen' },
        { img: 'room-bedroom.jpg', alt: 'Main bedroom' },
        { img: 'room-view.jpg', alt: 'Second living space' }
      ],
      agentName: 'Olivia Bennett',
      agentInitials: 'OB',
      isNew: true
    },
    {
      id: 2,
      title: 'Storybook cottage near the green',
      address: '3 Mill Lane',
      city: 'Ashbury',
      type: 'house',
      status: 'sale',
      price: 649000,
      beds: 3,
      baths: 2,
      area: 1640,
      year: 1932,
      lot: 4800,
      garage: 1,
      img: 'house-cottage.jpg',
      gallery: [],
      agentName: 'Emily Parker',
       agentInitials: 'EP',
      isNew: false
    },
    {
      id: 3,
      title: 'Restored brick townhouse',
      address: '88 Carver Street',
      city: 'Old Town',
      type: 'townhouse',
      status: 'sale',
      price: 915000,
      beds: 3,
      baths: 2.5,
      area: 2100,
      year: 1905,
      lot: 1800,
      garage: 0,
      img: 'house-townhouse.jpg',
      agentName: 'James Carter',
      agentInitials: 'JC',
      isNew: true
    },
    {
      id: 4,
      title: 'Light-filled 2-bed with balcony',
      address: 'Unit 6C, 210 Harbour Walk',
      city: 'Waterfront',
      type: 'apartment',
      status: 'rent',
      price: 3200,
      beds: 2,
      baths: 2,
      area: 1080,
      year: 2021,
      lot: 0,
      garage: 1,
      img: 'house-apartment.jpg',
      agentName: 'Michael Brooks',
      agentInitials: 'MB',
      isNew: false
    },
    {
      id: 5,
      title: 'Hillside villa with pool & views',
      address: '7 Olive Ridge',
      city: 'Westhills',
      type: 'house',
      status: 'sale',
      price: 2450000,
      beds: 5,
      baths: 4.5,
      area: 4300,
      year: 2015,
      lot: 14500,
      garage: 3,
      img: 'house-villa.jpg',
      agentName: 'Michael Brooks',
      agentInitials: 'MB',
      isNew: false
    },
    {
      id: 6,
      title: 'Warehouse loft, double-height ceilings',
      address: 'Loft 4, 12 Foundry Yard',
      city: 'Arts District',
      type: 'apartment',
      status: 'sale',
      price: 789000,
      beds: 2,
      baths: 2,
      area: 1720,
      year: 1924,
      lot: 0,
      garage: 1,
      img: 'house-loft.jpg',
      agentName: 'James Carter',
      agentInitials: 'JC',
      isNew: false
    },
    {
      id: 7,
      title: 'Garden-level studio apartment',
      address: '2A, 45 Elm Row',
      city: 'Old Town',
      type: 'apartment',
      status: 'rent',
      price: 1750,
      beds: 1,
      baths: 1,
      area: 560,
      year: 1968,
      lot: 0,
      garage: 0,
      img: 'house-studio.jpg',
      agentName: 'Emily Parker',
      agentInitials: 'EP',
      isNew: true
    },
    {
      id: 8,
      title: 'Family townhouse by the park',
      address: '21 Parkside Mews',
      city: 'Northfield',
      type: 'townhouse',
      status: 'rent',
      price: 4100,
      beds: 4,
      baths: 3,
      area: 2250,
      year: 2008,
      lot: 1600,
      garage: 1,
      img: 'house-townhouse-park.jpg',
      agentName: 'Olivia Bennett',
      agentInitials: 'OB',
      isNew: false
    },
    {
      id: 9,
      title: 'Country cottage with orchard',
      address: 'Orchard End, Kings Road',
      city: 'Ashbury',
      type: 'house',
      status: 'sale',
      price: 720000,
      beds: 3,
      baths: 2,
      area: 1900,
      year: 1911,
      lot: 21000,
      garage: 2,
      img: 'house-flower.jpg',
      agentName: 'Emily Parker',
      agentInitials: 'EP',
      isNew: false
    }
  ];

  var $ = function (selector, context) {
    return (context || document).querySelector(selector);
  };

  var $$ = function (selector, context) {
    return Array.prototype.slice.call(
      (context || document).querySelectorAll(selector)
    );
  };

  var money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });

  var num = new Intl.NumberFormat('en-US');

  var ICON = {
    bed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 18v-8M21 18v-5a3 3 0 0 0-3-3H10v5M3 15h18M6.5 12.5a1.5 1.5 0 1 0 0-.01"/></svg>',
    bath: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM6 12V6a2 2 0 0 1 4 0M7 19l-1 2M17 19l1 2"/></svg>',
    area: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>'
  };

  // ---------- Favorites storage and helpers ----------

  // Store property IDs as strings so they match data-favorite-id.
  var favorites = [];

  try {
    var savedFavorites = localStorage.getItem('northlineFavorites');
    var parsedFavorites = savedFavorites
      ? JSON.parse(savedFavorites)
      : [];

    if (Array.isArray(parsedFavorites)) {
      favorites = parsedFavorites.map(String);
    }
  } catch (error) {
    // The website still works if storage is unavailable or invalid.
    favorites = [];
  }

  var isFavorite = function (id) {
    return favorites.indexOf(String(id)) !== -1;
  };

  var saveFavorites = function () {
    try {
      localStorage.setItem(
        'northlineFavorites',
        JSON.stringify(favorites)
      );
    } catch (error) {
      // The current-page interaction still works if storage is unavailable.
    }
  };

  var updateFavoriteButton = function (button, saved) {
    button.setAttribute('aria-pressed', String(saved));

    button.setAttribute(
      'aria-label',
      saved
        ? 'Remove property from favorites'
        : 'Save property to favorites'
    );

    button.textContent = saved ? '♥' : '♡';
    button.classList.toggle('is-favorite', saved);
  };

  var syncFavoriteButtons = function (context) {
    $$('.favorite-toggle', context || document).forEach(function (button) {
      updateFavoriteButton(
        button,
        isFavorite(button.getAttribute('data-favorite-id'))
      );
    });
  };

  // One delegated click handler supports cards created now or later.
  document.addEventListener('click', function (event) {
    var target = event.target;

    if (!target || typeof target.closest !== 'function') {
      return;
    }

    var button = target.closest('.favorite-toggle');

    if (!button) {
      return;
    }

    var id = button.getAttribute('data-favorite-id');

    if (id === null) {
      return;
    }

    id = String(id);

    var index = favorites.indexOf(id);
    var saved;

    if (index === -1) {
      favorites.push(id);
      saved = true;
    } else {
      favorites.splice(index, 1);
      saved = false;
    }

    saveFavorites();

    // Update every currently visible button for this property.
    $$('.favorite-toggle').forEach(function (item) {
      if (item.getAttribute('data-favorite-id') === id) {
        updateFavoriteButton(item, saved);
      }
    });
  });

  // ---------- Mobile menu ----------

  var toggle = $('.menu-toggle');
  var links = $('#nav-links');

  if (toggle && links) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      links.classList.toggle('open', open);
    };

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    links.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        setOpen(false);
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && links.classList.contains('open')) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // ---------- Reveal ----------

  var reveals = $$('.reveal');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px' });

    reveals.forEach(function (element) {
      io.observe(element);
    });
  } else {
    reveals.forEach(function (element) {
      element.classList.add('in');
    });
  }

  // ---------- Listing cards ----------

  function priceLabel(listing) {
    return money.format(listing.price) +
      (listing.status === 'rent' ? '<small> /mo</small>' : '');
  }

  function card(listing) {
    var saved = isFavorite(listing.id);

    var favoriteButton =
      '<button class="favorite-toggle' +
      (saved ? ' is-favorite' : '') +
      '" type="button"' +
      ' data-favorite-id="' + listing.id + '"' +
      ' aria-pressed="' + String(saved) + '"' +
      ' aria-label="' +
      (saved
        ? 'Remove property from favorites'
        : 'Save property to favorites') +
      '">' +
      (saved ? '♥' : '♡') +
      '</button>';

    return '<article class="card">' +
      '<div class="card-media">' +
      '<img src="assets/img/' + listing.img +
      '" alt="' + listing.title +
      '" loading="lazy" width="800" height="600">' +
      '<span class="badge ' +
      (listing.status === 'rent' ? 'rent' : '') +
      '">' +
      (listing.status === 'rent' ? 'For rent' : 'For sale') +
      '</span>' +
      (listing.isNew
        ? '<span class="badge new">New</span>'
        : '') +
      favoriteButton +
      '</div>' +

      '<div class="card-body">' +
      '<p class="price">' + priceLabel(listing) + '</p>' +
      '<h3><a href="listing.html?id=' + listing.id + '">' +
      listing.title +
      '</a></h3>' +
      '<p class="addr">' + listing.address + ', ' +
      listing.city + '</p>' +
      '<ul class="specs">' +
      '<li>' + ICON.bed + listing.beds + ' bd</li>' +
      '<li>' + ICON.bath + listing.baths + ' ba</li>' +
      '<li>' + ICON.area + num.format(listing.area) +
      ' sq ft</li>' +
      '</ul>' +
      '</div></article>';
  }

  var grid = $('#listings');
  var form = $('#search');

    if (grid && form) {
    var count = $('#result-count');
    var sort = $('#sort');
    var chips = $$('.chips button');
    var typeFilter = 'all';

    var favoritesFilter = $('#favorites-filter');
    var favoritesOnly = false;

    var apply = function () {
      var fields = form.elements;
      var q = (fields.q.value || '').trim().toLowerCase();
      var status = fields.status.value;
      var type = fields.type.value !== 'any'
        ? fields.type.value
        : typeFilter;
      var beds = parseInt(fields.beds.value, 10) || 0;
      var max = parseInt(fields.max.value, 10) || Infinity;

      var list = LISTINGS.filter(function (listing) {
        if (status !== 'any' && listing.status !== status) {
          return false;
        }

        if (favoritesOnly && !isFavorite(listing.id)) {
          return false;
        }

        if (type !== 'all' && type !== 'any' && listing.type !== type) {
          return false;
        }

        if (listing.beds < beds) {
          return false;
        }

        if (listing.status === 'sale' && listing.price > max) {
          return false;
        }

        if (
          q &&
          (
            listing.title + ' ' +
            listing.address + ' ' +
            listing.city + ' ' +
            listing.type
          ).toLowerCase().indexOf(q) === -1
        ) {
          return false;
        }

        return true;
      });

      var sortValue = sort ? sort.value : 'featured';

      if (sortValue === 'price-asc') {
        list.sort(function (a, b) { return a.price - b.price; });
      }

      if (sortValue === 'price-desc') {
        list.sort(function (a, b) { return b.price - a.price; });
      }

      if (sortValue === 'size') {
        list.sort(function (a, b) { return b.area - a.area; });
      }

      if (sortValue === 'new') {
        list.sort(function (a, b) {
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        });
      }

      if (list.length) {
        grid.innerHTML = list.map(card).join('');
      } else if (favoritesOnly) {
        grid.innerHTML =
          '<p class="empty">You haven\'t saved any properties yet. ' +
          'Select the heart on a property to add it to your favorites.</p>';
      } else {
        grid.innerHTML =
          '<p class="empty">No homes match those filters yet. ' +
          'Try widening your search or ' +
          '<a href="#contact">ask us to set up an alert</a>.</p>';
      }

      if (count) {
        count.textContent = list.length +
          (list.length === 1 ? ' home' : ' homes');
      }

      syncFavoriteButtons(grid);
    };

    if (favoritesFilter) {
      favoritesFilter.addEventListener('click', function () {
        favoritesOnly = !favoritesOnly;
        favoritesFilter.setAttribute('aria-pressed', String(favoritesOnly));
        favoritesFilter.textContent = favoritesOnly
          ? '♥ Favorites only'
          : '♡ Favorites only';
        apply();
      });
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      apply();

      var target = $('#homes');

      if (target) {
        target.scrollIntoView({
          behavior: window.matchMedia(
            '(prefers-reduced-motion: reduce)'
          ).matches ? 'auto' : 'smooth'
        });
      }
    });

    form.addEventListener('change', function (event) {
      if (event.target.name === 'status' || event.target.name === 'type') {
        apply();
      }
    });

    if (sort) {
      sort.addEventListener('change', apply);
    }

    chips.forEach(function (button) {
      button.addEventListener('click', function () {
        typeFilter = button.dataset.type;
        form.elements.type.value = 'any';

        chips.forEach(function (chip) {
          chip.setAttribute('aria-pressed', String(chip === button));
        });

        apply();
      });
    });

    apply();
  }

  // Synchronize any static or previously rendered favorite buttons.
  syncFavoriteButtons(document);

  // ---------- Listing detail (listing.html?id=N) ----------

  var detail = $('[data-listing]');

  if (detail) {
    var id = parseInt(
      new URLSearchParams(location.search).get('id'),
      10
    ) || 1;

    var listing = LISTINGS.filter(function (item) {
      return item.id === id;
    })[0] || LISTINGS[0];

    var agentNameEl = document.querySelector('#enquire .agent-top h2');
    var agentAvatarEl = document.querySelector('#enquire .agent-top .avatar');

    if (agentNameEl && listing.agentName) {
      agentNameEl.textContent = listing.agentName;
   }

   if (agentAvatarEl && listing.agentInitials) {
    agentAvatarEl.textContent = listing.agentInitials;
  }

   var detailFavorite = $('#detail-favorite');

     if (detailFavorite) {
      detailFavorite.setAttribute(
       'data-favorite-id',
         String(listing.id)
    );

     updateFavoriteButton(
      detailFavorite,
        isFavorite(listing.id)
    );
   }


    var set = function (key, html) {
      $$('[data-field="' + key + '"]').forEach(function (element) {
        element.innerHTML = html;
      });
    };

    set('title', listing.title);
    set('address', listing.address + ', ' + listing.city);
    set('price', priceLabel(listing));
    set('beds', listing.beds);
    set('baths', listing.baths);
    set('area', num.format(listing.area));
    set('year', listing.year);
    set(
      'garage',
      listing.garage ? listing.garage + '-car' : 'Street parking'
    );
    set(
      'lot',
      listing.lot ? num.format(listing.lot) + ' sq ft' : '—'
    );
    set(
      'type',
      listing.type.charAt(0).toUpperCase() + listing.type.slice(1)
    );
    set(
      'status',
      listing.status === 'rent' ? 'For rent' : 'For sale'
    );
    set(
      'ppsf',
      listing.status === 'rent'
        ? '—'
        : money.format(Math.round(listing.price / listing.area))
    );
    set('ref', 'HVN-' + (1000 + listing.id));

        if (listing.id !== 1) {
      $$('.detail h2').forEach(function (heading) {
        var title = heading.textContent.trim();

        if (
          title !== 'About this home' &&
          title !== 'Features' &&
          title !== 'Floor plan & location'
        ) {
          return;
        }

        heading.style.display = 'none';

        var next = heading.nextElementSibling;

        while (next && next.tagName !== 'H2' && next.tagName !== 'SECTION') {
          next.style.display = 'none';
          next = next.nextElementSibling;
        }
      });

      $$('.spec-table th').forEach(function (th) {
        var label = th.textContent.trim();

        if (
          label === 'Heating & cooling' ||
          label === 'Energy rating' ||
          label === 'HOA fees'
        ) {
          th.parentElement.style.display = 'none';
        }
      });

      $$('.aside .agent-card').forEach(function (cardEl) {
        if (!cardEl.querySelector('form')) {
          cardEl.style.display = 'none';
        }
      });

      var floorLink = $('.photos .more');

      if (floorLink) {
        floorLink.style.display = 'none';
      }
    }

    if (listing.id !== 1) {
      $$('[data-listing-one]').forEach(function (element) {
        element.style.display = 'none';
      });
    }

    var hero = $('[data-field-img]');

    if (hero) {
      hero.src = 'assets/img/' + listing.img;
      hero.alt = listing.title;
    }

    var galleryImages = document.querySelectorAll('[data-gallery-img]');
    var photosGrid = $('.photos');

    if (photosGrid) {
      photosGrid.classList.toggle(
        'photos-single',
        !(listing.gallery && listing.gallery.length)
      );
    }

    galleryImages.forEach(function (img, index) {
      var photo = listing.gallery && listing.gallery[index];
      var figure = img.closest('figure');

      if (!figure) return;

      if (!photo) {
        figure.hidden = true;
        return;
     }

     figure.hidden = false;
     img.src = 'assets/img/' + photo.img;
     img.alt = photo.alt || '';
     });

    document.title = listing.title + ' — ' +
      listing.city + ' |  Northline Property Group';

    var msg = $('#enq-msg');

    if (msg && !msg.value) {
      msg.value = 'Hi, I\'d like more information about ' +
        listing.address + ' (HVN-' + (1000 + listing.id) +
        '). Is it still available?';
    }

    var mortgageForm = $('#mortgage');

    if (mortgageForm) {
      if (listing.status === 'rent') {
        var mortgageSection = mortgageForm.closest('section');

        if (mortgageSection) {
          mortgageSection.hidden = true;
        }
      } else if (mortgageForm.elements.price) {
        mortgageForm.elements.price.value = listing.price;
      }
    }

    var similar = $('#similar');

    if (similar) {
      similar.innerHTML = LISTINGS
        .filter(function (item) {
          return item.id !== listing.id &&
            item.status === listing.status;
        })
        .slice(0, 3)
        .map(card)
        .join('');

      syncFavoriteButtons(similar);
    }
  }

  // ---------- Mortgage calculator ----------

  // Monthly P&I:
  // M = P * r(1+r)^n / ((1+r)^n - 1)
  // r = annual rate / 12; n = years * 12.

  var mortgageCalculator = $('#mortgage');

  if (mortgageCalculator) {
    var calc = function () {
      var fields = mortgageCalculator.elements;
      var price = Math.max(0, parseFloat(fields.price.value) || 0);
      var downPct = parseFloat(fields.down.value) || 0;
      var rate = parseFloat(fields.rate.value) || 0;
      var years = parseInt(fields.term.value, 10) || 30;

      var principal = price * (1 - downPct / 100);
      var monthlyRate = rate / 100 / 12;
      var numberOfPayments = years * 12;

      var principalAndInterest = monthlyRate
        ? principal * monthlyRate *
          Math.pow(1 + monthlyRate, numberOfPayments) /
          (
            Math.pow(1 + monthlyRate, numberOfPayments) - 1
          )
        : principal / numberOfPayments;

      var tax = price * 0.011 / 12;
      var insurance = price * 0.0035 / 12;
      var total = principalAndInterest + tax + insurance;

      var downOutput = $('#down-out');
      var rateOutput = $('#rate-out');
      var totalOutput = $('#m-total');
      var piOutput = $('#m-pi');
      var taxOutput = $('#m-tax');
      var insuranceOutput = $('#m-ins');
      var loanOutput = $('#m-loan');
      var interestOutput = $('#m-interest');

      if (downOutput) {
        downOutput.textContent = downPct + '% · ' +
          money.format(price * downPct / 100);
      }

      if (rateOutput) {
        rateOutput.textContent = rate.toFixed(2) + '%';
      }

      if (totalOutput) {
        totalOutput.textContent = money.format(total);
      }

      if (piOutput) {
        piOutput.textContent = money.format(principalAndInterest);
      }

      if (taxOutput) {
        taxOutput.textContent = money.format(tax);
      }

      if (insuranceOutput) {
        insuranceOutput.textContent = money.format(insurance);
      }

      if (loanOutput) {
        loanOutput.textContent = money.format(principal);
      }

      if (interestOutput) {
        interestOutput.textContent = money.format(
          principalAndInterest * numberOfPayments - principal
        );
      }

      var totalForBars = total || 1;
      var piBar = $('.bar .pi');
      var taxBar = $('.bar .tx');
      var insuranceBar = $('.bar .ins');

      if (piBar) {
        piBar.style.width =
          (principalAndInterest / totalForBars * 100) + '%';
      }

      if (taxBar) {
        taxBar.style.width = (tax / totalForBars * 100) + '%';
      }

      if (insuranceBar) {
        insuranceBar.style.width =
          (insurance / totalForBars * 100) + '%';
      }
    };

    mortgageCalculator.addEventListener('input', calc);

    mortgageCalculator.addEventListener('submit', function (event) {
      event.preventDefault();
      calc();
    });

    calc();
  }

  // ---------- Demo forms ----------

  $$('form[data-demo]').forEach(function (demoForm) {
    demoForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var output = demoForm.querySelector('.form-msg') ||
        demoForm.parentElement.querySelector('.form-msg');

      if (output) {
        output.textContent =
          'Thanks! Your message is on its way. ' +
          '(Demo form — connect Formspree or Netlify Forms ' +
          'to receive enquiries.)';
        output.hidden = false;
      }

      demoForm.reset();
    });
  });

  $$('[data-year]').forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });
})();