import React, { Fragment, useState, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import SimpleList from "../../components/SimpleList/SimpleList";
import SubscriptionsListItem from "./SubscriptionsListItem";
import {
	StyledFlexHorizontalContainer,
	StyledFlexVerticalContainer,
} from "../../components/Styled";
import { StickyBottom } from "../../components/Sticky";
import SubscriptionsBottomAppBar from "./SubscriptionsBottomAppBar";
import {
	useSortFilterSubscriptionsQuery,
	useLastPriceQuery,
} from "../../features/subscription/subscriptionApi";
import PiggyAnimation from "../../components/Animations/PiggyAnimation";
import { selectUser } from "../../features/auth/authSelectors";
import SearchBar from "../../components/SearchBar/SearchBar";
import {
	selectFilterCategory,
	selectSort,
} from "../../features/settings/settingsSelector";

const renderComponent = (item, index) => {
	return <SubscriptionsListItem key={index} subscription={item} />;
};

const defaultCondition = "";

const Subscriptions = () => {
	const dispatch = useDispatch();
	const { id } = useSelector(selectUser);
	const { sortColumn, sortASC } = useSelector(selectSort);
	const { categories_id, name } = useSelector(selectFilterCategory);

	const [condition, setCondition] = useState(defaultCondition);

	const handleConditionChange = useCallback((val) => {
		setCondition(val);
	}, []);

	const {
		data: subscriptions,
		isLoading: isLoadingSubscriptions,
		isFetching: isFetchingSubscriptions,
	} = useSortFilterSubscriptionsQuery(
		{
			id,
			sortColumn,
			sortASC,
			categories_id,
		}, // refetch without cached data
		{ refetchOnMountOrArgChange: true }
	);

	const {
		data: lastPrice,
		isLoading: isLoadingLastPrice,
		isFetching: isFetchingLastPrice,
	} = useLastPriceQuery({}, { refetchOnMountOrArgChange: true });

	if (
		isLoadingSubscriptions ||
		isFetchingSubscriptions ||
		isLoadingLastPrice ||
		isFetchingLastPrice
	) {
		return <PiggyAnimation />;
	}

	const filterFunction = () =>
		subscriptions.filter((item) =>
			item.name.toLowerCase().includes(condition.toLowerCase())
		);

	return (
		<Fragment>
			<StyledFlexVerticalContainer>
				<Alert severity="info">
					<AlertTitle>
						Dernière demande de prix de la part d'un utilisateur
					</AlertTitle>
					<strong>{lastPrice?.subscriptionName}</strong> est
					actuellement à <strong>{lastPrice?.price} CHF </strong>
					par mois !
				</Alert>
				<Box sx={{ my: 2, mx: 1 }}>
					<SearchBar onChange={handleConditionChange} />
				</Box>
				<Container>
					<SimpleList
						data={subscriptions}
						filterFunction={filterFunction}
						renderComponent={renderComponent}
						listSubheader={name}
					/>
				</Container>
			</StyledFlexVerticalContainer>
			<StickyBottom>
				<SubscriptionsBottomAppBar />
			</StickyBottom>
		</Fragment>
	);
};

export default Subscriptions;
