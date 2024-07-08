const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Configura el transportador de nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Puedes usar otro servicio, como SMTP
  auth: {
    user: 'ingdanielvadez@gmail.com',
    pass: 'rcnl yjnj chma izau'
  }
});

// Función para leer y reemplazar variables en el template HTML
const getTemplate = (templateName, variables) => {
  const templatePath = path.join(__dirname, `${templateName}.html`);
  let template = fs.readFileSync(templatePath, 'utf8');
  for (const key in variables) {
    const value = variables[key];
    const regex = new RegExp(`{{${key}}}`, 'g');
    template = template.replace(regex, value);
  }
  return template;
};

// Función para enviar el correo electrónico
const sendEmail = async (to, variables) => {
  const htmlContent = getTemplate('emailTemplate', variables);

  const mailOptions = {
    from: 'ingdanielvadez@gmail.com',
    to,
    subject: 'Datos de Acceso - M&G Gestores de Cobro',
    html: htmlContent
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado exitosamente');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};

module.exports = {
  sendEmail
};
