import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Grid from "@mui/joy/Grid";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { SignOut as ArrowsLeftRightIcon } from "@phosphor-icons/react/dist/ssr/SignOut";
import Login from "./pages/login";
import Confetti from "react-confetti";
import Alert from "@mui/joy/Alert";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/joy/IconButton";
import Earnings from "./components/dashboard/crypto/earnings";
import Exchange from "./components/dashboard/crypto/exchange";
import WalletCard from "./components/dashboard/crypto/currency-card";
import MarketStockSummary from "./components/dashboard/crypto/market-stock-summary";
import MarketValues from "./components/dashboard/crypto/market-values";
import TodayBalance from "./components/dashboard/crypto/today-balance";

const { innerWidth, innerHeight } = window;

export default function App() {
	const [loaded, setLoaded] = React.useState(true);
	const [marketData, setMarketData] = React.useState([]);
	const [marketValues, setMarketValues] = React.useState([]);
	const [volume, setVolume] = React.useState(0);
	const [user, setUser] = React.useState({});
	const [error, _setError] = React.useState("");
	const [success, setSuccess] = React.useState("");
	const [confetti, setConfetti] = React.useState(false);

	const setError = (err) => {
		window.scrollTo(0, 0);
		document.getElementById("scrollme").scrollIntoView({ behavior: "smooth" });
		return _setError(err);
	};
	const handleLogin = (event) => {
		event.preventDefault();
		setLoaded(false);
		const formData = new FormData(event.currentTarget);
		const formJson = Object.fromEntries(formData.entries());
		fetch("/api/a3/nosql_injection/sign_in", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(formJson),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.status === "success") {
					setError("");
					setSuccess(res.message);
					setConfetti(true);
					handleUserInfo();
				} else {
					setError(res.message);
					setLoaded(true);
				}
			});
	};

	const handleExchange = (event) => {
		event.preventDefault();
		setLoaded(false);
		const formData = new FormData(event.currentTarget);
		const formJson = Object.fromEntries(formData.entries());
		fetch("/api/a3/nosql_injection/exchange", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(formJson),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.status === "success") {
					setError("");
					setSuccess(res.message);
					handleUserInfo();
				} else {
					setError(res.message);
					setLoaded(true);
				}
			});
	};
	const handleMarketSummary = () =>
		fetch("/api/a3/nosql_injection/market_summary")
			.then((res) => res.json())
			.then((res) => {
				setVolume(res.volume1d);
				setMarketData(res.market_summary);
				return res.market_summary;
			});

	const handleMarketValues = (coin) =>
		fetch("/api/a3/nosql_injection/market_values", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				coin: coin,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				return res;
			});

	const handleUserInfo = () =>
		fetch("/api/a3/nosql_injection/user_info")
			.then((res) => res.json())
			.then((res) => {
				if (res.status === "success") {
					setUser(res.message);
					setLoaded(true);
					if (res.flag) {
						setError("");
						setSuccess(res.flag);
						setConfetti(true);
					}
				} else {
					setUser({});
					setError(res.message);
				}
			});

	const handleMarketsValues = async () => {
		const markets = [];
		markets.push(await handleMarketValues("HBTNc"));
		markets.push(await handleMarketValues("BTC"));
		markets.push(await handleMarketValues("ETH"));
		markets.push(await handleMarketValues("SOL"));
		setMarketValues(markets);
	};

	React.useEffect(() => {
		handleUserInfo();
		handleMarketSummary();
		handleMarketsValues();
	}, []);
	return (
		<Box
			component="main"
			className="MainContent"
			sx={{
				px: { xs: 2, md: 6 },
				pt: {
					xs: "calc(12px + var(--Header-height))",
					sm: "calc(12px + var(--Header-height))",
					md: 3,
				},
				overflow: "auto",
				pb: { xs: 2, sm: 2, md: 3 },
				flex: 1,
				display: "flex",
				flexDirection: "column",
				minWidth: 0,
				maxHeight: "100vh",
				gap: 1,
				boxSizing: "border-box",
			}}
		>
			{confetti && (
				<Confetti
					width={innerWidth}
					height={innerHeight}
					recycle={false}
					numberOfPieces={150}
					tweenDuration={3000}
					gravity={0.3}
					onConfettiComplete={() => setConfetti(false)}
				/>
			)}
			<Stack>
				<div id="scrollme">
					<Typography
						fontSize={{ xs: "xl3", lg: "xl4" }}
						level="h1"
						sx={{ my: 1 }}
					>
						Holbie Crypto
					</Typography>
					<div>
						{error && (
							<Alert
								startDecorator={<WarningIcon />}
								sx={{ my: 2 }}
								variant="outlined"
								component="pre"
								color="danger"
								endDecorator={
									<IconButton
										variant="soft"
										size="sm"
										color="danger"
										onClick={() => setError("")}
									>
										<CloseIcon />
									</IconButton>
								}
							>
								{error}
							</Alert>
						)}
						{success && (
							<Alert
								startDecorator={<CheckCircleIcon />}
								sx={{
									my: 2,
									wordWrap: "break-word",
									wordBreak: "break-word",
									whiteSpace: "pre-wrap",
								}}
								variant="soft"
								component="pre"
								color="success"
								endDecorator={
									<IconButton
										variant="soft"
										size="sm"
										color="success"
										onClick={() => setSuccess("")}
									>
										<CloseIcon />
									</IconButton>
								}
							>
								{success}
							</Alert>
						)}
					</div>
				</div>
				{user.username && (
					<Stack direction="row" spacing={3} sx={{ mt: 1, mb: 2 }}>
						<Typography level="h4" sx={{ flex: "1 1 auto" }}>
							Welcome {user.username.toUpperCase()}
						</Typography>
						<Button
							variant="outlined"
							color="danger"
							size="sm"
							startDecorator={
								<ArrowsLeftRightIcon
									fontSize="var(--Icon-fontSize)"
									weight="bold"
								/>
							}
							onClick={() =>
								fetch("/api/a3/nosql_injection/sign_out").then(
									location.reload()
								)
							}
						>
							Sign out
						</Button>
					</Stack>
				)}
				<Grid container spacing={3}>
					{user.wallet?.map((wallet) => (
						<Grid key={wallet.coin} lg={3} md={6} xs={12}>
							<WalletCard wallet={wallet} />
						</Grid>
					))}
					<Grid lg={8} md={6} xs={12}>
						<Stack spacing={3}>
							<MarketStockSummary data={marketData} volume={volume} />
							<MarketValues data={marketValues} />
						</Stack>
					</Grid>
					<Grid lg={4} md={6} xs={12}>
						{user.username ? (
							<Stack spacing={3}>
								<TodayBalance
									amount={user.amount}
									diff={user.diff}
									trend={user.trend}
									children={<Earnings data={user.earning} />}
								/>
								<Exchange
									user={user}
									handleExchange={handleExchange}
									loaded={!loaded}
								/>
							</Stack>
						) : (
							<Login handleLogin={handleLogin} loaded={!loaded} />
						)}
					</Grid>
				</Grid>
			</Stack>
		</Box>
	);
}
