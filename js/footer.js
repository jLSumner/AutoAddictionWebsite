document.addEventListener("DOMContentLoaded", function () {
  const footerContainer = document.getElementById("footer");
  if (footerContainer) {
    footerContainer.innerHTML = `
      <div class="footer-top">
        <img src="images/logos/logo.png" alt="Company Logo" class="footer-logo">
        <br>
      </div>

      <div class="footer-grid">
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="index">Home</a></li>
            <li><a href="services">Services</a></li>
            <li><a href="contact">Contact</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><a href="termsConditions" id="terms-link">Terms &amp; Conditions</a></li>
            <li><a href="privacy">Privacy Policy</a></li>
          </ul>
        </div>

        <div class="footer-col footer-contact">
          <h4>Address</h4>
          <p>49-51 King St,<br>Bendigo VIC 3550,<br>Australia</p>
        </div>

        <div class="footer-col">
          <h4>Opening Hours</h4>
          <p>MON-FRI - 8am-5:30pm</p>
          <p>SAT - 9am-1pm</p>
          <p>SUN - Closed</p>
        </div>
      </div>

      <br>

      <div class="footer-mid">
        <div class="contact-form-footer">
          <form action="mailto:info@autoaddictionbgo.com.au" method="post" enctype="text/plain">
            <input type="text" id="name" name="name" placeholder="Name:" required>
            <input type="number" id="number" name="number" placeholder="Number:" required>
            <input type="email" id="email" name="email" placeholder="Email" required>
            <textarea id="message" name="message" placeholder="What is your message?" required></textarea>
            <br>
            <button type="submit">Send</button>
          </form>
        </div>
        <div class="reachOut">
          <h1>GET IN TOUCH</h1>
          <br>
          <p><img src="images/location.png" alt="Location icon"><strong> 49 King Street, Bendigo VIC 3550</strong></p>
          <p><img src="images/email.png" alt="Email icon"><strong> info@autoaddictionbgo.com.au</strong></p>
          <p><img src="images/phone.png" alt="Phone icon"><strong> (03) 5441 5200</strong></p>
        </div>
      </div>

      <div class="footer-mid-2">
        <div class="store-locator-footer">
          <div class="contact-map-footer">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.291540287917!2d144.2748349152827!3d-36.763572936408345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad759f2f825d8ff%3A0x1675337597c472c2!2sAuto%20Addiction%20Bendigo!5e0!3m2!1sen!2sau!4v1742620788508!5m2!1sen!2sau"
              frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-col center-text">
          <img src="images/jslogo.png" alt="Jayden Sumner Logo" class="footer-logo center-img">
          <p class="footer-credit">Website produced by Jayden Sumner</p>
        </div>
        <br>
        <p>&copy; 2025 Auto Addiction Bendigo / Opposite Lock Bendigo | ABN: 50 762 462 214</p>
        <p>All Rights Reserved.</p>
		<a id="login" href="login">Login</a>
        <br>
        <p class="footer-follow-label">Follow Us:</p>
        <a href="https://www.facebook.com/autoaddictionbendigo/">
          <img src="images/facebook.png" alt="Facebook">
        </a>
        <a href="https://www.instagram.com/autoaddictionbendigo/">
          <img src="images/instagram.png" alt="Instagram">
        </a>
      </div>
    `;
  }
});