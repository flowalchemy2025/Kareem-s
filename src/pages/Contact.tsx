import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import tiramisuImg from "@/assets/images/tiramisu.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form validation would go here
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-accent overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${tiramisuImg})` }}></div>
        <div className="relative z-10 text-center text-primary-foreground px-4">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            We'd love to hear from you. Visit us or send a message
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <h2 className="font-display text-3xl font-bold text-foreground mb-8">Contact Information</h2>

            <Card className="border-border hover:shadow-elegant transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="text-primary" size={20} />
                  Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ground Floor, Aman Lifestyle,<br />
                  Nelson Square, Rajnagar,<br />
                  Near Sadar, Chaoni, Nagpur<br />
                  India
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-elegant transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Phone className="text-primary" size={20} />
                  Phone Numbers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">Primary: +91 96376 99199</p>
                <p className="text-muted-foreground">Alternate: +91 96376 99199</p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-elegant transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Mail className="text-primary" size={20} />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">kareems.nagpur@gmail.com</p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-elegant transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="text-primary" size={20} />
                  Opening Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
           <p className="text-muted-foreground">Daily Afternoon: 12:00 PM – 4:00 PM</p>
           <p className="text-muted-foreground">Daily Evening: 7:00 PM – 11:30 PM</p>

              </CardContent>
            </Card>

            {/* Quick Action Buttons */}
            <div className="pt-4 space-y-3">
              <Button className="w-full" size="lg" asChild>
                <a href="tel:+919637699199" className="flex items-center justify-center gap-2">
                  <Phone size={18} />
                  Call Now
                </a>
              </Button>
              <Button variant="outline" className="w-full" size="lg" asChild>
                <a href="https://wa.me/+919637699199" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  <MessageCircle size={18} />
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-8">Send Us a Message</h2>
            <Card className="border-border">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your inquiry..."
                      rows={6}
                      className="w-full resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-[400px] bg-muted">
        <div className="w-full h-[450px] rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Kareem's Restaurant Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.616840637777!2d79.0751209!3d21.1747679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c11b6e8862df%3A0xb12257c8dda364d8!2sKareem's%20Restaurant!5e0!3m2!1sen!2sin!4v1732800000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact;
