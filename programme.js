// Select the form inputs and button
const inputs = document.querySelectorAll('.container input');
const searchBtn = document.querySelector('#btn');

// House data matching your existing HTML listings
const houses = [
  {
    location: "garki area 2",
    street: "1550 area 2",
    type: "apartment",
    bedrooms: 2,
    features: "1 Living Room, 2 Bedrooms, Fully Fitted Kitchen",
    price: 20000000,
    displayPrice: "20M",
    img: "https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=774&auto=format&fit=crop"
  },
  {
    location: "maitama",
    street: "4bedroom duplex in maitama",
    type: "duplex",
    bedrooms: 4,
    features: "3 Living Rooms, 4 Bedrooms, Guest House, Fully Fitted Kitchen",
    price: 900000000,
    displayPrice: "900M",
    img: "https://images.unsplash.com/photo-1605307350812-0a31b45eeb11?q=80&w=1160&auto=format&fit=crop"
  },
  {
    location: "luxury",
    street: "6 bedroom duplex",
    type: "duplex",
    bedrooms: 6,
    features: "2 Living Rooms, Swimming Pool, Fully Furnished",
    price: 1000000000,
    displayPrice: "1 Billion",
    img: "https://images.unsplash.com/photo-1643297550841-1386b3a10612?q=80&w=953&auto=format&fit=crop"
  }
];

searchBtn.addEventListener('click', function (e) {
  e.preventDefault();

  const cityStreet = inputs[0].value.trim().toLowerCase();
  const houseType = inputs[1].value.trim().toLowerCase();
  const priceInput = parseFloat(inputs[2].value);

  // Remove any previous result popup
  const existing = document.getElementById('search-result-popup');
  if (existing) existing.remove();

  // Filter houses based on inputs
  const results = houses.filter(house => {
    const matchLocation =
      cityStreet === '' ||
      house.location.includes(cityStreet) ||
      house.street.includes(cityStreet);

    const matchType =
      houseType === '' || house.type.includes(houseType);

    const matchPrice =
      isNaN(priceInput) || priceInput === 0 || house.price <= priceInput * 1000000;

    return matchLocation && matchType && matchPrice;
  });

  // Build popup result box
  const popup = document.createElement('div');
  popup.id = 'search-result-popup';
  popup.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 12px;
    padding: 24px;
    z-index: 9999;
    max-width: 700px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 10px 40px rgba(0,0,0,0.4);
    font-family: sans-serif;
  `;

  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✕ Close';
  closeBtn.style.cssText = `
    float: right;
    background: #444;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 6px 14px;
    cursor: pointer;
    font-size: 14px;
  `;
  closeBtn.onclick = () => popup.remove();
  popup.appendChild(closeBtn);

  const title = document.createElement('h2');
  title.textContent = results.length > 0
    ? `${results.length} Result(s) Found`
    : 'No Houses Found';
  title.style.cssText = 'margin: 0 0 16px; color: #333;';
  popup.appendChild(title);

  if (results.length === 0) {
    const msg = document.createElement('p');
    msg.textContent = 'Try adjusting your search — check the city/street, type, or increase your price range.';
    msg.style.color = '#666';
    popup.appendChild(msg);
  } else {
    results.forEach(house => {
      const card = document.createElement('div');
      card.style.cssText = `
        display: flex;
        gap: 16px;
        border: 1px solid #eee;
        border-radius: 10px;
        padding: 14px;
        margin-bottom: 14px;
        align-items: flex-start;
        background: #fafafa;
      `;

      const img = document.createElement('img');
      img.src = house.img;
      img.width = 160;
      img.height = 110;
      img.style.cssText = 'border-radius: 8px; object-fit: cover; flex-shrink: 0;';

      const info = document.createElement('div');
      info.innerHTML = `
        <strong style="font-size:16px; color:#222;">${house.street.toUpperCase()}</strong><br>
        <span style="color:#555; font-size:14px;">${house.features}</span><br><br>
        <span style="background:orange; padding:4px 10px; border-radius:6px; font-weight:bold; font-size:14px;">
          PRICE: ${house.displayPrice}
        </span>
      `;

      card.appendChild(img);
      card.appendChild(info);
      popup.appendChild(card);
    });
  }

  // Overlay backdrop
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 9998;
  `;
  overlay.onclick = () => { popup.remove(); overlay.remove(); };

  document.body.appendChild(overlay);
  document.body.appendChild(popup);

  // Auto-remove overlay when popup closes
  const observer = new MutationObserver(() => {
    if (!document.getElementById('search-result-popup')) {
      overlay.remove();
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true });
});
            
// Select the section
const recommendSection = document.querySelector('.recommend');

// Change background color
recommendSection.style.backgroundColor = 'white';
recommendSection.style.color='black';
recommendSection.style.textAlign='center';
recommendSection.style.fontSize='xx-large';

const container2section= document.querySelector('.container2');
container2section.style.backgroundColor='white';