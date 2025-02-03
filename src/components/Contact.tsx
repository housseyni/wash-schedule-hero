import { Instagram, MessageSquare } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-heading font-bold text-center mb-12">
          Contactez-nous
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <a
              href="https://instagram.com/carwashpro"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Instagram className="w-8 h-8 mr-3" />
              <span className="text-lg">@carwashpro</span>
            </a>
            <a
              href="https://snapchat.com/add/carwashpro"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <MessageSquare className="w-8 h-8 mr-3" />
              <span className="text-lg">@carwashpro</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;