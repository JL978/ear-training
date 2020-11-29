import React from "react";
import "../styles/globals.css";
import { makeStyles } from "@material-ui/core/styles";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Box,
	Container,
} from "@material-ui/core";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
	title: {
		flexGrow: 1,
	},
}));

function MyApp({ Component, pageProps }) {
	const classes = useStyles();
	const router = useRouter();

	return (
		<Box display="flex" height="100vh" flexDirection="column">
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						Ear Sharp
					</Typography>
					<Button onClick={() => router.push("/about")} color="inherit">
						About
					</Button>
					<Button onClick={() => router.push("/login")} color="inherit">
						Login
					</Button>
				</Toolbar>
			</AppBar>
			<Component {...pageProps} />
		</Box>
	);
}

export default MyApp;
