import React from 'react'
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <>

    {/* Custom component made */}
    <Header/>

    {/* main component with padding along y-axis with 3 units */}
    <main className="py-3">
      <Container>
    <Outlet />
    </Container>
    </main>
    <Footer/>
    </>
  )
}

export default App
