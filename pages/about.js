import React from "react";
import { Container, Box, Typography } from "@material-ui/core";

export default function about() {
	return (
		<Box
			flexGrow={1}
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			<Container>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					textAlign="center"
				>
					<Typography variant="h3" component="h2" textAlign="center">
						An ear training app to test your ability to identify intervals
					</Typography>
				</Box>
			</Container>
		</Box>
	);
}
