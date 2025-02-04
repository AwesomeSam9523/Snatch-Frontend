

import { Inter } from "next/font/google";
import Navbar from "../madeComponents /Navbar";
import Footer from "../madeComponents /Footer";



const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
