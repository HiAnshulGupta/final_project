import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import img1 from '../images/img1.jpg'
import img2 from '../images/img2.jpg'
import img3 from '../images/img3.jpg'
function BasicExample() {
  return (
    <div>
    <Card style={{  width: '18rem' }}>
      <Card.Img variant="top" src={img1} height = "500px" width = "100px" />
      <Card.Body>
        <Card.Title>Click for Birthday Booking</Card.Title>
        <Card.Text>
          Get exciting offers on pre paid bookings
        </Card.Text>
        <Button variant="primary">Click to book</Button>
      </Card.Body>
    </Card>



<Card style={{  width: '18rem' }}>
      <Card.Img variant="top" src={img2} height = "500px" width = "100px" />
      <Card.Body>
        <Card.Title>Click for Anniversary party Booking</Card.Title>
        <Card.Text>
          Get exciting offers on pre paid bookings
        </Card.Text>
        <Button variant="primary">Click to book</Button>
      </Card.Body>
    </Card>


<Card style={{  width: '18rem' }}>
      <Card.Img variant="top" src={img3} height = "500px" width = "100px" />
      <Card.Body>
        <Card.Title>Click for Baby showers Booking</Card.Title>
        <Card.Text>
          Get exciting offers on pre paid bookings
        </Card.Text>
        <Button variant="primary">Click to book</Button>
      </Card.Body>
    </Card>

    </div>
  )

}

export default BasicExample;