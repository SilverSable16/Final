import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import './ayuda.css'; // Archivo CSS para los estilos de la página

const faqData = [
    {
        pregunta: '¿Cuáles son los horarios de atención?',
        respuesta: 'Nuestros horarios de atención son de lunes a viernes, de 9:00 AM a 8:00 PM, y los fines de semana de 10:00 AM a 6:00 PM.',
    },
    {
        pregunta: '¿Se pueden hacer reservas en línea?',
        respuesta: 'Sí, puedes hacer reservas en línea a través de nuestra página de reservas o llamando directamente a cualquiera de nuestras sucursales.',
    },
    {
        pregunta: '¿Dónde están ubicadas las sucursales?',
        respuesta: 'Contamos con sucursales en el Centro, en la zona Norte y en la zona Sur de la ciudad. Puedes consultar la dirección exacta en nuestra página de sucursales.',
    },
    {
        pregunta: '¿Cuál es la política de cancelación de reservas?',
        respuesta: 'Las cancelaciones deben realizarse al menos 24 horas antes de la hora de la reserva para evitar cargos adicionales.',
    },
];

const Ayuda = () => {
    return (
        <div>
            <Header />
            <main className="faq-container">
                <h2>Preguntas Frecuentes</h2>
                <div className="faq-list">
                    {faqData.map((faq, index) => (
                        <div key={index} className="faq-item">
                            <h3 className="faq-question">{faq.pregunta}</h3>
                            <p className="faq-answer">{faq.respuesta}</p>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Ayuda;
