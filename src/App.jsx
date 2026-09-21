import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import About from './pages/About'
import Careers from './pages/Careers'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Pricing from './pages/Pricing'

const PRODUCT_SLUGS = [
  'wallet',
  'vault',
  'pay',
  'request',
  'transfer',
  'connect',
  'identity',
  'observability',
  'disputes',
  'compliance',
]

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {PRODUCT_SLUGS.map((slug) => (
            <Route key={slug} path={`/${slug}`} element={<ProductPage slug={slug} />} />
          ))}
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
