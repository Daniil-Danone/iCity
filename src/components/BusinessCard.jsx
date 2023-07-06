import styled from 'styled-components';
import avatar from '../images/avatar.jpg'
import star from '../images/star.jpg'

const MainBlock = styled.div`
    display: flex;
    background: linear-gradient(106.35deg, #FFECDF 0.71%, #FFA3A3 128.04%);
    border-radius: 30px;
    height: 225px;
    width: 520px;
    align-items: center;
    padding-left: 20px;
`
const Avatar = styled.img`
    display: block;
    width: 150px;
    height: 150px;
    border-radius: 50%;
`
/* const Check = styled.img`
    border-radius: 50%;
` */

const Username = styled.text`
    color: #FFFFFF;
    font-size: 28px;
    font-family: 'Montserrat';
    font-weight: 600;
`

const Rating = styled.text`
    color: #FFFFFF;
    font-size: 20px;
    font-family: 'Montserrat';
    font-weight: 600;
`

const Cont = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left:60px;
`

const Star = styled.img`
    width: 22px;
    height: 22px;
`

const BusinessCard = ({ user }) => {
    return(
        <MainBlock>
            <Avatar src={avatar}></Avatar>
            <Cont>
                <Username>{user.name + ' ' + user.surname}</Username>
                    <div>
                        <Star src={star}></Star>
                        <Rating>4.9</Rating>
                    </div>
            </Cont>
            {/* <Check src={check}></Check> */}
        </MainBlock>
    )
}

export default BusinessCard;