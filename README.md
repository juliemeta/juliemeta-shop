# Juliemeta Shop Frontend

A modern webshop frontend built with **Next.js**, **MUI**, and **Emotion**.

---

## 🚀 Features

- Responsive design
- Product listing
- Product details page
- Shopping cart (coming soon)
- Clean and modern UI with MUI

---

## 🛠️ Tech Stack

- Next.js (App Router)
- React
- Material UI (MUI)
- Emotion (CSS-in-JS)
- TypeScript

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/juliemeta-shop.git
cd juliemeta-shop
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## 📁 Project Structure

```bash
app/           # Pages using Next.js App Router
components/    # Reusable UI components (Navbar, ProductCard, etc.)
public/        # Static assets (images, icons)
styles/        # Optional global styles
```

---

## 👩‍💻 Author

Julie M. Monefeldt

---

## 📄 License

MIT License

---

## 🧩 Component Example

`components/HomeComponent.tsx`

```tsx
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const TestBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

export default function HomeComponent() {
  return (
    <TestBox>
      <Button variant="contained">Hello from HomeComponent</Button>
    </TestBox>
  );
}
```
