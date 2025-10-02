import { useState } from 'react'
import ikidsLogo from '../assets/images/ikids-logo.png'
import founderImg from '../assets/images/ikids-founder.png'
import teachersImg from '../assets/images/ikids-teachers.png'
import environmentImg from '../assets/images/ikids-enviroment.png'
import bannerImg from '../assets/images/ikids-banner.png'
import workshopImg from '../assets/images/ikids-workshop.png'
import joinImg from '../assets/images/ikids-join.png'

const LandingPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            {/* Logo */}
            <img
              src={ikidsLogo}
              alt="iKids Academy logo"
              className="w-20 h-auto rounded-xl"
            />
            <div>
              <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#14B0F2]">iKids Academy</div>
              <div className="text-xs sm:text-sm text-gray-500">Foreign Language Education Center</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a className="hover:text-[#14B0F2]" href="#features">Features</a>
            <a className="hover:text-[#14B0F2]" href="#programs">Programs</a>
            <a className="hover:text-[#14B0F2]" href="#exams">Exams</a>
            <a className="hover:text-[#14B0F2]" href="#contact">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#contact" className="ml-2 hidden md:inline-flex items-center rounded-full bg-[#14B0F2] text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-[#129EDB] focus:outline-none focus:ring-2 focus:ring-[#14B0F2]">Get in touch</a>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden inline-flex items-center rounded-lg p-2 text-[#14B0F2] hover:bg-[#14B0F2]/10 focus:outline-none focus:ring-2 focus:ring-[#14B0F2]"
            >
              {/* Hamburger Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
                <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white/90 backdrop-blur">
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2 text-sm">
              <a className="py-2 hover:text-[#14B0F2]" href="#programs" onClick={() => setMobileOpen(false)}>Programs</a>
              <a className="py-2 hover:text-[#14B0F2]" href="#features" onClick={() => setMobileOpen(false)}>Features</a>
              <a className="py-2 hover:text-[#14B0F2]" href="#exams" onClick={() => setMobileOpen(false)}>Exams</a>
              <a className="py-2 hover:text-[#14B0F2]" href="#contact" onClick={() => setMobileOpen(false)}>Contact</a>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#14B0F2] text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-[#129EDB]"
              >
                Get in touch
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative">
        {/* Background banner */}
        <div className="absolute inset-0">
          <img src={bannerImg} alt="iKids banner background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-white/70 sm:bg-white/60 md:bg-white/50"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-10 sm:py-15 grid md:grid-cols-4 gap-10 md:gap-16 items-center">
          <div className="md:col-span-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Empower your child's English journey with <span className='text-[#14B0F2]'>iKids</span>
            </h1>
            <p className="mt-4 text-gray-600 text-base sm:text-lg">
              Cambridge Young Learners (Starters, Movers, Flyers), KET, and IELTS classes designed for impactful learning, confidence, and real-world results.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#programs" className="inline-flex items-center rounded-full bg-[#14B0F2] text-white px-5 py-2.5 text-sm font-semibold shadow-sm hover:bg-[#129EDB]">Explore Programs</a>
              <a href="https://ikidsedu.com.vn/home" target='_blank' className="inline-flex items-center rounded-full border border-blue-200 bg-white text-[#129EDB] px-5 py-2.5 text-sm font-semibold hover:border-blue-300">Visit Exam Portal</a>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs text-gray-500">
              <span>Trusted by parents and learners across Vietnam</span>
            </div>
          </div>
          {/* Decorative SVG column removed as requested */}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-[#14B0F2]/10">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">Why choose <span className='text-[#14B0F2]'>iKids</span>?</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white p-5 border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="font-semibold">Experienced Teachers</div>
              <p className="mt-2 text-sm text-gray-600">Dedicated educators specialized in young learners and exam prep.</p>
            </div>
            <div className="rounded-2xl bg-white p-5 border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="font-semibold">Interactive Learning</div>
              <p className="mt-2 text-sm text-gray-600">Lessons enriched with games, projects, and real-life scenarios.</p>
            </div>
            <div className="rounded-2xl bg-white p-5 border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="font-semibold">Progress Tracking</div>
              <p className="mt-2 text-sm text-gray-600">Regular assessment, feedback, and parent updates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Parents Learn Together */}
      <section id="parents" className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">Why Do Parents Need to Accompany Their Children to Learn English?</h2>
          <div className="mt-6">
            <div className="mx-auto max-w-md">
              <div className="rounded-2xl bg-[#14B0F2]/10 p-6 border border-gray-100 text-center">
                <div className="text-5xl font-extrabold text-[#14B0F2]">90%</div>
                <div className="mt-2 text-sm sm:text-base text-gray-700">Young Successful children</div>
                <div className="mt-1 text-xs sm:text-sm text-gray-600">have positive support from the family according to international education research 2024</div>
              </div>
            </div>
            <div className="mt-8 grid sm:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-white p-5 border border-gray-100 shadow-sm hover:shadow-md transition text-left">
                <div className="font-semibold">Important Role</div>
                <p className="mt-2 text-sm text-gray-600">Parents are the most important companions to help children be confident, develop communication skills and effective language thinking.</p>
              </div>
              <div className="rounded-2xl bg-white p-5 border border-gray-100 shadow-sm hover:shadow-md transition text-left">
                <div className="font-semibold">Modern Methods</div>
                <p className="mt-2 text-sm text-gray-600">The workshop helps parents understand the method of learning modern English, suitable for Vietnamese children.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="bg-[#14B0F2]/10">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-2xl sm:text-3xl font-bold">Programs</h2>
          <p className="mt-2 text-gray-600">A structured pathway from young learners to international certifications.</p>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Starters */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition">
              <div className="text-sm font-semibold text-blue-700">Cambridge Young Learners</div>
              <div className="mt-1 text-lg font-bold">Starters</div>
              <p className="mt-2 text-sm text-gray-600">Beginner level focusing on basic vocabulary, phonics, and everyday communication.</p>
            </div>
            {/* Movers */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition">
              <div className="text-sm font-semibold text-blue-700">Cambridge Young Learners</div>
              <div className="mt-1 text-lg font-bold">Movers</div>
              <p className="mt-2 text-sm text-gray-600">Develop reading, listening, and speaking skills with engaging activities.</p>
            </div>
            {/* Flyers */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition">
              <div className="text-sm font-semibold text-blue-700">Cambridge Young Learners</div>
              <div className="mt-1 text-lg font-bold">Flyers</div>
              <p className="mt-2 text-sm text-gray-600">Advanced young learner level preparing for confident communication.</p>
            </div>
            {/* KET */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition">
              <div className="text-sm font-semibold text-green-700">Cambridge English</div>
              <div className="mt-1 text-lg font-bold">KET (A2 Key)</div>
              <p className="mt-2 text-sm text-gray-600">Foundation exam validating ability to communicate in simple situations.</p>
            </div>
            {/* IELTS */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition">
              <div className="text-sm font-semibold text-red-700">International English</div>
              <div className="mt-1 text-lg font-bold">IELTS</div>
              <p className="mt-2 text-sm text-gray-600">Comprehensive preparation for Academic and General Training modules.</p>
            </div>
            {/* Custom */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition">
              <div className="text-sm font-semibold text-indigo-700">Tailored Learning</div>
              <div className="mt-1 text-lg font-bold">Placement & Skills Boost</div>
              <p className="mt-2 text-sm text-gray-600">Personalized plans for reading, writing, listening, and speaking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Exams Portal */}
      <section id="exams" className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Exam & Test Portal</h2>
              <p className="mt-2 text-gray-600">
                Access our online platform to take placement tests, practice exams, and track performance.
              </p>
            </div>
            <a
              href="https://ikidsedu.com.vn/home"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#14B0F2] text-white px-5 py-2.5 text-sm font-semibold shadow-sm hover:bg-[#129EDB]"
            >
              {/* Globe Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                <path d="M2 12h20M12 2c3 4 3 16 0 20M12 2c-3 4-3 16 0 20" strokeWidth="1.5" />
              </svg>
              Visit Portal
            </a>
          </div>
        </div>
      </section>

      {/* Experts */}
      <section id="experts" className="bg-[#14B0F2]/10">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-center"><span className='text-[#14B0F2]'>iKids</span> Team of Experts - Your Trusted Companion</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white shadow-sm overflow-hidden hover:shadow-md transition">
              <img src={founderImg} alt="Ms. Thao Nguyen - Founder" className="w-full h-48 md:h-64 object-cover rounded-t-xl" />
              <div className="px-5 pb-5">
                <div className="mt-4">
                  <div className="text-base font-semibold">Ms. Thao Nguyen</div>
                  <div className="text-xs text-gray-500">Founder & Mentor</div>
                </div>
                <p className="mt-3 text-sm text-gray-600">Founder of the program "Parents and Children Learn English", inspiring thousands of Vietnamese families.</p>
              </div>
            </div>
            <div className="rounded-2xl bg-white shadow-sm overflow-hidden hover:shadow-md transition">
              <img src={teachersImg} alt="Native Teachers" className="w-full h-48 md:h-64 object-cover rounded-t-xl" />
              <div className="px-5 pb-5">
                <div className="mt-4">
                  <div className="text-base font-semibold">Native Teachers</div>
                  <div className="text-xs text-gray-500">International Teaching Team</div>
                </div>
                <p className="mt-3 text-sm text-gray-600">Native and Vietnamese teachers with over 5 years of professional experience teaching English to children.</p>
              </div>
            </div>
            <div className="rounded-2xl bg-white shadow-sm overflow-hidden hover:shadow-md transition">
              <img src={environmentImg} alt="Friendly Environment" className="w-full h-48 md:h-64 object-cover rounded-t-xl" />
              <div className="px-5 pb-5">
                <div className="mt-4">
                  <div className="text-base font-semibold">Friendly Environment</div>
                  <div className="text-xs text-gray-500">Child-Centered Learning</div>
                </div>
                <p className="mt-3 text-sm text-gray-600">Committed to creating a friendly, creative and comprehensive learning environment for children.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-2xl sm:text-3xl font-bold">Contact <span className='text-[#14B0F2]'>iKids</span></h2>
          <p className="mt-2 text-gray-600">Reach us via Zalo, Facebook, or our website for inquiries and enrollment.</p>

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Zalo */}
            <a
              href="https://zalo.me/"
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-[#14B0F2]/30 bg-white p-5 shadow-sm hover:shadow-md hover:border-[#14B0F2]/40 transition flex items-center gap-3"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#14B0F2] text-white font-bold">Z</div>
              <div>
                <div className="font-semibold">Zalo</div>
                <div className="text-xs text-gray-500">Chat with us on Zalo</div>
              </div>
            </a>
            {/* Facebook */}
            <a
              href="https://www.facebook.com/Ikidseduheadquater"
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-[#14B0F2]/30 bg-white p-5 shadow-sm hover:shadow-md hover:border-[#14B0F2]/40 transition flex items-center gap-3"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-700 text-white font-bold">f</div>
              <div>
                <div className="font-semibold">Facebook</div>
                <div className="text-xs text-gray-500">Follow updates and events</div>
              </div>
            </a>
            {/* Direct Consulting */}
            <div className="rounded-2xl border border-[#14B0F2]/30 bg-white p-5 shadow-sm hover:shadow-md hover:border-[#14B0F2]/40 transition cursor-pointer">
              <div className="font-semibold">Direct Consulting</div>
              <div className="text-xs text-gray-500">Or call hotline: 1900 1234 for direct consultation from our team of experts.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="bg-[#14B0F2]/10">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">Benefits Of Participating In The <span className='text-[#14B0F2]'>iKids</span> Seminar</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl bg-white p-5 border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="font-semibold">Learning Secrets</div>
              <p className="mt-2 text-sm text-gray-600">Capture the secret to help children learn English happily, effectively at home with practical activities.</p>
            </div>
            <div className="rounded-2xl bg-white p-5 border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="font-semibold">Expert Interaction</div>
              <p className="mt-2 text-sm text-gray-600">Direct interaction with language experts and experienced teachers in the field of education.</p>
            </div>
            <div className="rounded-2xl bg-white p-5 border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="font-semibold">Free Documents</div>
              <p className="mt-2 text-sm text-gray-600">The opportunity to receive free learning materials and special offers from iKids for your family.</p>
            </div>
            <div className="rounded-2xl bg-white p-5 border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="font-semibold">Community Connectivity</div>
              <p className="mt-2 text-sm text-gray-600">Connect with the parents community with the goal of developing English for their children.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="stories" className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">Success Stories From <span className='text-[#14B0F2]'>iKids</span> Families</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white p-5 border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#14B0F2] text-white" aria-hidden="true">"</div>
                <div className="font-semibold">Baby An's Success</div>
              </div>
              <p className="mt-3 text-sm text-gray-600">An (8 years old) improved her English level by 3 levels in just 6 months thanks to her mother's active support during her studies.</p>
            </div>
            <div className="rounded-2xl bg-white p-5 border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#14B0F2] text-white" aria-hidden="true">"</div>
                <div className="font-semibold">Sharing from Ms. Lan</div>
              </div>
              <p className="mt-3 text-sm text-gray-600">“The workshop helped me understand how to support my child in learning English without creating pressure, helping my child learn more happily and effectively.”</p>
            </div>
            <div className="rounded-2xl bg-white p-5 border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#14B0F2] text-white" aria-hidden="true">"</div>
                <div className="font-semibold">Hundreds of Parents</div>
              </div>
              <p className="mt-3 text-sm text-gray-600">Hundreds of parents have changed their mindset, created a positive learning environment and encouraged their children to learn English.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop showcase */}
      <section id="workshop" className="relative bg-[#14B0F2]/10">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <img src={workshopImg} alt="iKids Workshop Atmosphere" className="w-full h-80 sm:h-96 md:h-[420px] object-cover" />
            </div>
            <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl sm:text-3xl font-bold">Exciting Atmosphere at <span className="text-[#14B0F2]">iKids</span> Workshop</h3>
              <p className="mt-4 text-gray-600">Image of a parent-child English workshop at iKids with a lively atmosphere, children and parents excitedly participating in interesting interactive activities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join iKids CTA */}
      <section id="join" className="relative bg-white">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="rounded-2xl p-6 border border-[#14B0F2]/20 shadow-sm hover:shadow-md transition">
                <h3 className="text-2xl sm:text-3xl font-bold text-center">Let's Join <span className="text-[#14B0F2]">iKids</span>!</h3>
                <div className="mt-5 space-y-5">
                  <div>
                    <div className="text-sm font-semibold text-[#14B0F2]">Precious Opportunity</div>
                    <p className="mt-1 text-gray-600">Don't miss this precious opportunity to become your child's best companion on his or her journey to successful English learning.</p>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#14B0F2]">Sign Up Now</div>
                    <p className="mt-1 text-gray-600">Register today – The first step to opening up a successful future for your child with English!</p>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#14B0F2]">Dream Start</div>
                    <p className="mt-1 text-gray-600">iKids – The starting point for Vietnamese children's English dreams, building the future with their families.</p>
                  </div>
                </div>
                <div className="mt-6">
                  <a href="#contact" className="inline-flex items-center rounded-full bg-[#14B0F2] text-white px-5 py-2.5 text-sm font-semibold shadow-sm hover:bg-[#129EDB]">Join Now</a>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 overflow-hidden rounded-3xl shadow-lg">
              <img src={joinImg} alt="Join iKids" className="w-full h-80 sm:h-96 md:h-[420px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} iKids Academy. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#features" className="py-2 hover:text-[#14B0F2]">Features</a>
            <a href="#programs" className="py-2 hover:text-[#14B0F2]">Programs</a>
            <a href="#exams" className="py-2 hover:text-[#14B0F2]">Exams</a>
            <a href="#contact" className="py-2 hover:text-[#14B0F2]">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;