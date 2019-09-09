import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { expenseCategories } from '../../data/expenseCategories';
import { css } from 'aphrodite';
import { styles } from './ExpenseInput.css';
import TextField from '@material-ui/core/TextField';

export const ExpenseInput = () => {
    const [category, setCategory] = useState('');
    const [storeName, setStoreName] = useState('');
    const [amount, setAmount] = useState('');
    const [dbState, setDbState] = useState({
        data: [],
        id: 0,
        message: null,
        intervalIsSet: false,
        idToDelete: null,
        idToUpdate: null,
        objectToUpdate: null
    });
    const getEndpointUrl = 'http://localhost:3001/api/getData';
    const putEndpointUrl = 'http://localhost:3001/api/putData';
    const deleteEndpointUrl = 'http://localhost:3001/api/deleteData';
    const updateEndpointUrl = 'http://localhost:3001/api/updateData';

    useEffect(() => {
        getDataFromDb();
        if (!dbState.intervalIsSet) {
            const interval = setInterval(getDataFromDb, 1000);
            setDbState({
                ...dbState,
                intervalIsSet: interval
            });
        }

        return function cleanup() {
            if (dbState.intervalIsSet) {
                clearInterval(dbState.intervalIsSet);
                setDbState({
                    ...dbState,
                    intervalIsSet: null
                });
            }
        };
    });

    const getDataFromDb = async () => {
        const data = await fetch(getEndpointUrl);
        const dataJson = data.json();
        setDbState({ ...dbState, data: dataJson });
    };

    const putDataToDb = (category, businessName, amount) => {
        const currentIds = dbState.data.map(data => data.id);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
            idToBeAdded++;
        }

        axios.post(putEndpointUrl, {
            id: idToBeAdded,
            category,
            businessName,
            amount
        });
    };

    const deleteFromDb = idToDelete => {
        let objIdToDelete = null;
        dbState.data.forEach(data => {
            if (data.id === idToDelete) {
                objIdToDelete = data.id;
            }
        });

        axios.delete(deleteEndpointUrl, {
            data: {
                id: objIdToDelete
            }
        });
    };

    const updateDb = (idToUpdate, objectToUpdate) => {
        let objToUpdate = null;
        dbState.data.forEach(data => {
            if (data.id === idToUpdate) {
                objToUpdate = data.id;
            }
        });

        axios.post(updateEndpointUrl, {
            id: objToUpdate,
            update: { message: objectToUpdate }
        });
    };

    const handleCategoryChange = event => {
        setCategory(event.target.value);
    };

    const handleStoreNameChange = event => {
        setStoreName(event.target.value);
    };

    const handleAmountChange = event => {
        setAmount(event.target.value);
    };

    const handleAdd = () => {
        putDataToDb(category, storeName, amount);
    };

    return (
        <form>
            <FormControl>
                <Grid alignItems="flex-end" container spacing={4}>
                    <Grid item xs="auto">
                        <InputLabel htmlFor="category">Category</InputLabel>
                        <Select
                            className={css(styles.formControl)}
                            value={category}
                            onChange={handleCategoryChange}
                            inputProps={{
                                name: 'category-dropdown',
                                id: 'category'
                            }}
                        >
                            {expenseCategories.map(expenseCategory => (
                                <MenuItem value={expenseCategory}>
                                    {expenseCategory}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs="auto">
                        <TextField
                            id="store-name"
                            label="Store Name"
                            value={storeName}
                            onChange={handleStoreNameChange}
                        />
                    </Grid>
                    <Grid item xs="auto">
                        <TextField
                            id="amount"
                            label="Amount"
                            value={amount}
                            onChange={handleAmountChange}
                        />
                    </Grid>
                    <Grid item xs="auto">
                        <Button
                            className={css(styles.addButton)}
                            onClick={handleAdd}
                            size="small"
                            variant="contained"
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </FormControl>
        </form>
    );
};
