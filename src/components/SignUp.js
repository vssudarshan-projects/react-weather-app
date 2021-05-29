import {
  TextField,
  Button,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Breadcrumbs,
  Link,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Logo from "./Logo";

import "./master.css";
export default function SignUp() {
  return (
    <Container align="left" style={{ padding: 0, margin:"0 auto", width: '750px' }}>
      <Grid
        item
        xs={12}
        style={{ padding: 0, margin: 0, height: "30px", width: "100%" }}
      >
        <Grid container style={{ padding: 0, margin: 0 }}></Grid>
      </Grid>
      <Grid item xs={12} style={{ padding: 0, margin: 0 }}>
        <Grid container className="outerContainer">
          <Grid item xs={7} style={{ padding: 0, margin: 0 }}>
            <Grid container style={{ padding: 0, margin: 0 }}>
              <Grid item xs={12} style={{ padding: 0, margin: 0 }}>
                <Logo></Logo>
              </Grid>
              <Grid item xs={12} style={{ padding: 0, margin: 0 }}>
                <div>
                  <h1 className="formHeading" style={{ margin: 0 }}>
                    Create your Google Account
                  </h1>
                  <h2 className="formSubHeading" style={{ margin: 0 }}>
                    to continue to Gmail
                  </h2>
                </div>
              </Grid>
              <Grid item xs={12} style={{ padding: 0, margin: 0 }}>
                <form className="formWrapper">
                  <Grid container style={{ padding: 0, margin: 0 }}>
                    <Grid item xs={12}>
                      <Grid container style={{ padding: 0, margin: 0 }}>
                        <Grid
                          item
                          xs={6}
                          style={{ paddingRight: "4px", paddingTop: "8px" }}
                        >
                          <TextField
                            className="text"
                            label="First name"
                            variant="outlined"
                            size="small"
                            style={{ width: "100%" }}
                          ></TextField>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          style={{ paddingLeft: "4px", paddingTop: "8px" }}
                        >
                          <TextField
                            className="text"
                            label="Last name"
                            variant="outlined"
                            size="small"
                            style={{ width: "100%" }}
                          ></TextField>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ padding: 0, margin: 0 }}>
                      <Grid container style={{ padding: 0, margin: 0 }}>
                        <Grid
                          item
                          className="usernameWrapper"
                          xs={12}
                          style={{ padding: 0, margin: 0 }}
                        >
                          <TextField
                            className="text"
                            label="Username"
                            variant="outlined"
                            size="small"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  @gmail.com
                                </InputAdornment>
                              ),
                            }}
                            style={{ width: "100%" }}
                          ></TextField>
                          <Grid item style={{ padding: 0, margin: 0 }}>
                            <p className="formText">
                              You can use letters, numbers & periods
                            </p>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      className="passwordWrapper"
                      style={{ padding: 0, margin: 0 }}
                    >
                      <Grid container style={{ padding: 0, margin: 0 }}>
                        <Grid item xs={6} style={{ paddingRight: "4px" }}>
                          <TextField
                            className="text"
                            label="Password"
                            variant="outlined"
                            size="small"
                            style={{ width: "100%" }}
                            // type={state.isPassShow? 'text':'password'}
                          ></TextField>
                        </Grid>
                        <Grid item xs={6} style={{ paddingLeft: "4px" }}>
                          <TextField
                            className="text"
                            label="Confirm"
                            variant="outlined"
                            size="small"
                            style={{ width: "100%" }}
                          ></TextField>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} style={{ padding: 0, margin: 0 }}>
                        <p className="formText">
                          Use 8 or more characters with a mix of letters,
                          numbers & symbols
                        </p>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ padding: 0, margin: 0 }}>
                      <Grid container style={{ padding: 0, margin: 0 }}>
                        <Grid item xs={12} className=" optionWrapper">
                          <FormControlLabel
                            control={
                              <Checkbox
                                // checked={state.isPassShow}
                                // onChange={handleChange}
                                name="checkedB"
                                color="primary"
                              />
                            }
                            label="Show password"
                            style={{ width: "100%" }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} className="buttonWrapper">
                      <Grid container style={{ padding: 0, margin: 0 }}>
                        <Grid
                          item
                          xs={6}
                          align="left"
                          style={{ padding: 0, margin: 0 }}
                        >
                          <Button
                            className="buttonFlat"
                            style={{
                              textTransform: "none",
                              justifyContent: "left",
                            }}
                          >
                            Sign in instead
                          </Button>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          align="right"
                          style={{ padding: 0, margin: 0 }}
                        >
                          <Button
                            className="buttonFill"
                            variant="outlined"
                            style={{ textTransform: "none" }}
                          >
                            Next
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={5}
            className="imageWrapper__outer"
            style={{ padding: 0, margin: 0 }}
          >
            <Grid container className="imageWrapper__inner">
              <Grid item style={{ padding: 0, margin: 0 }}>
                <img
                  src="https://ssl.gstatic.com/accounts/signup/glif/account.svg"
                  alt=""
                  width="244"
                  height="244"
                  className="j9NuTc TrZEUc"
                ></img>
              </Grid>
              <Grid item style={{ padding: 0, margin: 0 }}>
                <p className="imageCaption">
                  One account. All of Google working for you.
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ padding: 0, margin: 0 }}>
        <Grid container className="linkWrapper" > 
          <Breadcrumbs aria-label="breadcrumb" separator="">
            <Link color="inherit" href="#" 
            // onClick={handleClick}
            >
              Help
            </Link>
            <Link
              color="inherit"
              href="#"
              // onClick={handleClick}
            >
              Privacy
            </Link>
            <Link
              color="inherit"
              href="#"
              // onClick={handleClick}
            >
              Terms
            </Link>
          </Breadcrumbs>
        </Grid>
      </Grid>
    </Container>
  );
}
