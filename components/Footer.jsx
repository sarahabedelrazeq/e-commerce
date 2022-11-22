import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@mui/icons-material";
import { Grid } from "@mui/material";
import Link from "next/link";
import styled from "styled-components";
import Container from "./Container";

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  return (
    <div>
      <Container>
        <Grid spacing={2} container alignItems="center">
          <Grid item sm={4} xs={12}>
            <div className="mb-3">
              <h1 className="fw-bold text-black">
                <Link href="/">
                  <span className="text-primary" role="button">
                    SARAH.
                  </span>
                </Link>
              </h1>
            </div>
            <div className="mb-3">
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don’t look even
                slightly believable.
              </p>
            </div>
            <div className="mb-3">
              <div className="d-flex align-items-center align-items-center gap-3">
                <SocialIcon color="3B5999">
                  <Facebook />
                </SocialIcon>
                <SocialIcon color="E4405F">
                  <Instagram />
                </SocialIcon>
                <SocialIcon color="55ACEE">
                  <Twitter />
                </SocialIcon>
                <SocialIcon color="E60023">
                  <Pinterest />
                </SocialIcon>
              </div>
            </div>
          </Grid>
          <Grid item sm={4} xs={12}>
            <div className="mb-3">
              <h3>Useful Links</h3>
            </div>
            <ul className="p-0 m-0 list-unstyled">
              <li className="m-0 p-0 mb-2">
                <Link href="/">
                  <span className="text-black" role="button">
                    Home
                  </span>
                </Link>
              </li>
              <li className="m-0 p-0 mb-2">
                <Link href="/cart">
                  <span className="text-black" role="button">
                    Cart
                  </span>
                </Link>
              </li>
              <li className="m-0 p-0 mb-2">
                <Link href="/productList/men's%20clothing">
                  <span className="text-black" role="button">
                    Man Fashion
                  </span>
                </Link>
              </li>
              <li className="m-0 p-0 mb-2">
                <Link href="/productList/women's%20clothing">
                  <span className="text-black" role="button">
                    Woman Fashion
                  </span>
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item sm={4} xs={12}>
            <div className="mb-3">
              <h3>Contact</h3>
            </div>
            <ContactItem>
              <Room style={{ marginRight: "10px" }} /> Amman/Jordan
            </ContactItem>
            <ContactItem>
              <Phone style={{ marginRight: "10px" }} /> +962785584039
            </ContactItem>
            <ContactItem>
              <MailOutline style={{ marginRight: "10px" }} />{" "}
              sarah.abed.elrazeq@gmail.com
            </ContactItem>
            <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Footer;
