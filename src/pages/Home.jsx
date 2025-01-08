import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure you have Bootstrap installed

function HomePage() {
  return (
    <div>
      {/* Full-screen image */}
      <div
        style={{
          backgroundImage: "url('https://via.placeholder.com/1920x1080')", // Replace with your image URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
        }}
      ></div>

      {/* Scroll-triggered button */}
      <div className="text-center my-5">
        <button
          className="btn btn-primary"
          style={{
            background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
            border: 'none',
            padding: '10px 20px',
            fontSize: '18px',
            borderRadius: '30px',
            color: 'white',
          }}
        >
          Menu
        </button>
      </div>

      {/* Carousel of best products */}
      <div className="container">
        <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://via.placeholder.com/800x400"
                className="d-block w-100"
                alt="Product 1"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Product 1</h5>
                <p>Description of Product 1</p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://via.placeholder.com/800x400"
                className="d-block w-100"
                alt="Product 2"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Product 2</h5>
                <p>Description of Product 2</p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://via.placeholder.com/800x400"
                className="d-block w-100"
                alt="Product 3"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Product 3</h5>
                <p>Description of Product 3</p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#productCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#productCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
