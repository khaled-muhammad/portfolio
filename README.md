# 💧 Glassy Portfolio — Khaled Muhammad

This is my dev portfolio, built with React, TypeScript, and a cool, modern look. It's got dynamic stuff, some 3D bits, interactive areas, and a backend hooked up. I was inspired by water, glass, and nature to make it look good and be fun to use.

---

## 🧠 What's it All About?

This isn't just a website; it's where I mess around with design and code:

* 🌊 The design flows like water and looks like glass.
* ⚙️ The pieces are put together in a way that's neat and easy to reuse.
* 🧩 The content changes, and it all comes from the backend.
* 🪟 It's got some fancy UI/UX tricks: parallax, magnetic stuff, and 3D backgrounds.

---

## 🚀 What's it Made Of?

* **Frontend:** React + TypeScript, React Router, Zod (for forms)
* **Looks:** CSS Modules / Tailwind CSS (depends what I used)
* **Backend:** Django (DRF)
* **3D:** Custom Canvas/Shader components
* **State:** Local state with props/context
* **Icons:** Custom SVG Glassy Icons

---

## ✨ What Can It Do?

### 🔧 Component Tweaks

* `GooeyBtn.tsx`: Added `onClick` so it can be used in more places.
* `Footer.tsx`: Made it its own thing, nice and clean.
* `Layout.tsx`: Simple layout that works with the router.
* `NavBar.tsx`: Made the links scroll smoothly.
* `SimpleGlassyBtn.tsx`: Cleaned it up to match the others.
* `ParallaxGallery.tsx`: Fixed the links so they work right.

### 🎨 UI/UX

* 3D backgrounds: Rain, snow, clouds.
* Mesh backgrounds and water-like UI.
* Cool Navigation Bar that looks like glass.
* It looks good on any screen.
* Skill icons get a magnetic effect when you hover.
* Certificates scroll sideways forever.

### 📄 Pages

* `Projects`: The cards change based on the backend data.
* `Certificates`: Shows off my certs in a gallery.
* `Certificate`: A closer look at each cert with parallax.
* `Contact`: Easy and the backend validates it.
* `About`: Soft animations.
* Landing Section: Cool text, glass buttons.

### 📦 Backend

* Made Django models:

  * `Project`
  * `Certificate`
  * `SocialMedia`
* Made serializers and views for the models.
* Frontend talks to the backend.
* Admin panel to change content.

---

## 📁 Where Stuff Is

```
src/
│
├── components/
│   ├── GooeyBtn.tsx
│   ├── SimpleGlassyBtn.tsx
│   ├── NavBar.tsx
│   ├── Footer.tsx
│   ├── Layout.tsx
│   └── ...
│
├── pages/
│   ├── Home.tsx
│   ├── Projects.tsx
│   ├── Contact.tsx
│   ├── Certificates.tsx
│   ├── Certificate.tsx
│   └── ...
│
├── assets/
│   └── icons/
│       └── msg.svg
│
├── App.tsx
├── main.tsx
└── index.css
```

---

## 📌 What's Left?

* Add a dark mode switch.
* Make it more accessible.
* Hook up the contact form to email.
* Add ways to filter and sort projects.

---

## 🧑‍💻 Who Made This?

**Khaled Muhammad**
💼 18 y/o Dev | UI/UX Fan
📍 Alexandria, Egypt
🧠 INTP | Fast typer | Code poet
