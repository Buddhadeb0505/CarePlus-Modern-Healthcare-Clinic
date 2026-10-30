// CarePlus demo website interactions.
// Replace this number with the clinic's verified WhatsApp number in international format.
const WHATSAPP_NUMBER = "913300000000"; // Example placeholder: India country code +91 + number

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
mainNav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));

document.getElementById("year").textContent = new Date().getFullYear();

// Prevent selecting a date in the past.
const preferredDate = document.getElementById("preferredDate");
if (preferredDate) {
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
  preferredDate.min = localDate;
}

function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
const defaultMessage = "Hello CarePlus, I would like to enquire about an appointment.";
["floatingWhatsApp", "footerWhatsApp"].forEach(id => {
  const link = document.getElementById(id);
  if (link) link.href = whatsappUrl(defaultMessage);
});

const appointmentForm = document.getElementById("appointmentForm");
const formMessage = document.getElementById("formMessage");
appointmentForm?.addEventListener("submit", event => {
  event.preventDefault();
  if (!appointmentForm.reportValidity()) return;
  const data = new FormData(appointmentForm);
  const name = data.get("name").trim();
  const phone = data.get("phone").trim();
  const department = data.get("department");
  const date = data.get("date") || "Flexible";
  const message = data.get("message").trim() || "No additional message";
  const text = [
    "Hello CarePlus, I would like to make an appointment enquiry.",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Department: ${department}`,
    `Preferred date: ${date}`,
    `Message: ${message}`
  ].join("\n");
  formMessage.textContent = "Opening WhatsApp with your enquiry. Please review and send the message to complete your request.";
  window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
});

const testimonials = [
  {quote:"The team took time to listen and explained the next steps in a way that was easy to understand.",name:"Patient story placeholder",meta:"Sample testimonial · Replace before launch",initials:"PS"},
  {quote:"It was simple to find the information I needed and send an enquiry. The experience felt welcoming.",name:"Visitor story placeholder",meta:"Sample testimonial · Replace before launch",initials:"VS"},
  {quote:"Clear communication can make a healthcare visit feel less stressful. I appreciated the guidance.",name:"Patient story placeholder",meta:"Sample testimonial · Replace before launch",initials:"PS"}
];
let testimonialIndex = 0;
function renderTestimonial() {
  const item = testimonials[testimonialIndex];
  document.getElementById("testimonialQuote").textContent = item.quote;
  document.getElementById("testimonialName").textContent = item.name;
  document.getElementById("testimonialMeta").textContent = item.meta;
  document.getElementById("testimonialInitials").textContent = item.initials;
}
document.getElementById("prevTestimonial")?.addEventListener("click", () => {
  testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
  renderTestimonial();
});
document.getElementById("nextTestimonial")?.addEventListener("click", () => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  renderTestimonial();
});
