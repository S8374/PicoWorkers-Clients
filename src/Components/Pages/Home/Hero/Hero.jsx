import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '@nextui-org/react';
import { useState } from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';  // Import fade effect styles

// Import required modules
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

export const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);  // State to toggle video visibility

  const handleShowVideo = () => {
    setShowVideo(true);  // Show video
  };

  const handleCloseVideo = () => {
    setShowVideo(false);  // Hide video and go back to slider
  };

  return (
    <div className="relative w-full h-screen">
      {!showVideo ? (
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          effect="fade"  // Enable fade effect
          fadeEffect={{ crossFade: true }}  // Enable crossfade during transition
          autoplay={{
            delay: 2500,  // Delay between slides
            disableOnInteraction: false,  // Keep autoplay enabled even after user interaction
          }}
          speed={1000}  // Set the transition speed to 1 second (1000ms)
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, EffectFade]}  // Include the necessary modules
          className="mySwiper h-full w-full"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="relative w-full h-full">
              <img
                src="https://media.istockphoto.com/id/1883285965/photo/an-unrecognizable-businesswoman-working-in-her-office-on-her-computer.jpg?s=612x612&w=0&k=20&c=gGxCXAwnjSYtoYBxe3IviqIzkJc0WLTdmhUXpQxpcw8="
                alt="Businesswoman"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
                <h1 className=" md:text-7xl font-bold mb-4 font1 text-5xl ">Welcome to Our Service</h1>
                <p className=" mb-6 font2  text-2xl">We provide top-notch solutions for your business.</p>
                <Button
                  auto
                  shadow
                  color="gradient"
                  size="lg"
                  className="bg-gradient-to-r px-12 py-4 from-green-400 to-blue-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform  font1  text-xl duration-300"
                  onClick={handleShowVideo}  // Show video on click
                >
                  See Demo
                </Button>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="relative w-full h-full">
              <img
                src="https://media.istockphoto.com/id/1481370371/photo/portrait-of-enthusiastic-hispanic-young-woman-working-on-computer-in-a-modern-bright-office.jpg?s=612x612&w=0&k=20&c=8kNce9Ruc9F2KXvnwf0stWQXCwwQTBCrW8efrqhUIa4="
                alt="Young Woman Working"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
                <h1 className="font1 text-5xl md:text-7xl font-bold mb-4">Empowering Your Business</h1>
                <p className="font2  text-2xl mb-6">Enhance productivity with our solutions.</p>
                <Button
                  auto
                  shadow
                  color="gradient"
                  size="lg"
                  className="bg-gradient-to-r px-12 py-4 from-green-400 to-blue-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 font1  text-xl"
                  onClick={handleShowVideo}  // Show video on click
                >
                  See Demo
                </Button>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="relative w-full h-full">
              <img
                src="https://media.istockphoto.com/id/2059963058/photo/remote-work-from-home-video-call-and-man-with-a-laptop-internet-connection-or-conference-call.jpg?s=612x612&w=0&k=20&c=RmNh9DJo2DwjJxWsRQb3BjaARiiKxIaqayrBE3sCeEU="
                alt="Remote Work"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
                <h1 className=" text-5xl md:text-7xl  mb-4 font1">Remote Work Made Easy</h1>
                <p className="font2  text-2xl mb-6">Stay connected, stay productive.</p>
                <Button
                  auto
                  shadow
                  color="gradient"
                  size="lg"
                  className="bg-gradient-to-r px-12 py-4 from-green-400 to-blue-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 font1  text-xl"
                  onClick={handleShowVideo}  // Show video on click
                >
                  See Demo
                </Button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
          <div className="relative w-full h-full">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              onClick={handleCloseVideo}  // Close video and show slider
              className="absolute top-5 right-5 text-white text-3xl font-bold py-2 px-4 rounded-full bg-gradient-to-r from-green-400 to-blue-500 shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
