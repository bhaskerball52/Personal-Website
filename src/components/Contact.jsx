import { useState } from 'react'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')

    emailjs.send(
      'website',      // from EmailJS dashboard
      'template_ug3erct',     // from EmailJS dashboard
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'bhaskerball52@gmail.com'
      },
      'XjxJYEEiGw8q239cc'       // from EmailJS dashboard
    )
    .then(() => {
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setStatus(''), 3000)
    })
    .catch(() => {
      setStatus('error')
      setTimeout(() => setStatus(''), 3000)
    })
  }

  return (
    <section id="contact" className="py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Contact Me</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="contact-box group relative bg-neutral-900/50 backdrop-blur-sm rounded-2xl p-10 border border-neutral-700 transition-all duration-300 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Write your message here..."
                    rows="5"
                    className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>

                {status === 'success' && (
                  <p className="text-center text-green-400 text-sm">Message sent successfully! ✓</p>
                )}
                {status === 'error' && (
                  <p className="text-center text-red-400 text-sm">Failed to send. Please try again.</p>
                )}
                
                <p className="text-center text-neutral-400 text-sm mt-4">
                  Don't want to use the form? Email me at <a href="mailto:bhaskerball52@gmail.com" className="text-purple-400 hover:text-purple-300 transition-colors">bhaskerball52@gmail.com</a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes jelly {
          0%, 100% { transform: scale(1, 1); }
          25% { transform: scale(0.98, 1.02); }
          50% { transform: scale(1.02, 0.98); }
          75% { transform: scale(0.99, 1.01); }
        }
        .contact-box:hover { animation: jelly 0.6s ease-in-out; }
      `}</style>
    </section>
  )
}