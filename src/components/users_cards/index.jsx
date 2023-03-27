import { Wrapper, Card, CardHeader, CardBody, CardFooter } from './styles'

const UsersCard = ({filteredUsers}) => {

  return (
    <Wrapper>
      {filteredUsers.map((user, index) => (
        <Card key={index}>
          <CardHeader>{user.owner}</CardHeader>
          <CardBody>
            <p>{user.full_name}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.city + ', ' + user.state}</p>
          </CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      ))}
    </Wrapper>
  );
};

export default UsersCard;