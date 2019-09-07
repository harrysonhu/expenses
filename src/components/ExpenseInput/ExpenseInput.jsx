import React, { useState } from 'react';
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

    const handleCategoryChange = event => {
        setCategory(event.target.value);
    };

    const handleStoreNameChange = event => {
        setStoreName(event.target.value);
    };

    const handleAmountChange = event => {
        setAmount(event.target.value);
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
