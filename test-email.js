import emailjs from '@emailjs/browser';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function testEmail() {
  try {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_placeholder';
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_placeholder';
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'public_key_placeholder';
    
    console.log("Service ID:", serviceId);
    console.log("Template ID:", templateId);
    console.log("Public Key:", publicKey);

    const res = await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: 'Test Name',
        from_email: 'test@example.com',
        message: 'This is a test message.',
        to_email: 'jophin735@gmail.com',
      },
      publicKey
    );
    console.log("Success!", res.status, res.text);
  } catch (err) {
    console.error("Error:", err);
  }
}

testEmail();
