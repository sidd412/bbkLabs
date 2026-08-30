import dotenv from 'dotenv';
dotenv.config();

async function test() {
  const { whatsappService } = await import('./src/utils/whatsapp.js');
  console.log("Testing WhatsApp...");
  await whatsappService.sendAdminAlert("Test Name", "Test Service", "+919999999999");
  console.log("Done");
}

test();
