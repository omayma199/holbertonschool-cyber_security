import * as React from "react";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import Stack from "@mui/joy/Stack";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import Tabs from "@mui/joy/Tabs";
import Typography from "@mui/joy/Typography";

export default function Exchange({ user, handleExchange, loaded }) {
	const [current, setCurrent] = React.useState("Buy");
	const [amount, setAmount] = React.useState(1);
	const [coin, setCoin] = React.useState("HBTNc");
	const coins_list = user.wallet?.reduce((acc, item) => {
		const { coin, ...rest } = item;
		acc[coin] = rest;
		return acc;
	}, {});
	return (
		<form onSubmit={handleExchange}>
			<Card>
				<Tabs
					size="sm"
					value={current}
					variant="custom"
					onClick={() => setCurrent(current === "Buy" ? "Sell" : "Buy")}
				>
					<TabList>
						<Tab value="Buy">Buy</Tab>
						<Tab value="Sell">Sell</Tab>
					</TabList>
				</Tabs>
				<FormControl>
					<FormLabel>Chain</FormLabel>
					<Select
						name="coin"
						value={coin}
						onChange={({ target }) => setCoin(target.innerText)}
					>
						<Option value="HBTNc">HBTNc</Option>
						<Option value="BTC">BTC</Option>
						<Option value="ETH">ETH</Option>
					</Select>
				</FormControl>
				<FormControl>
					<FormLabel>Amount</FormLabel>
					<Input
						name="amount"
						defaultValue={amount}
						onChange={({ target }) => setAmount(target.value)}
					/>
				</FormControl>
				<Stack
					direction="row"
					spacing={2}
					sx={{ justifyContent: "space-between" }}
				>
					<Typography level="title-md">Total</Typography>
					<Typography>
						{new Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "USD",
						}).format(coins_list[coin].value * amount)}
					</Typography>
				</Stack>

				<hr style={{ width: "100%" }} />
				<Stack
					direction="row"
					spacing={2}
					sx={{ justifyContent: "space-between" }}
				>
					<Typography level="title-md">Balance</Typography>
					{current === "Sell" ? (
						<Typography>
							{coins_list[coin].amount} {coin}
						</Typography>
					) : (
						<Typography>
							{new Intl.NumberFormat("en-US", {
								style: "currency",
								currency: "USD",
							}).format(coins_list.USD.amount)}
						</Typography>
					)}
				</Stack>
				<input type="hidden" name="action" value={current} />
				<Button color="primary" variant="solid" loading={loaded} type="submit">
					{current} {coin}
				</Button>
			</Card>
		</form>
	);
}
