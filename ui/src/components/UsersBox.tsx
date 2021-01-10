import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import dotenv from 'dotenv';
import User from './UserInterface';
import { makeStyles } from '@material-ui/core/styles';
import userContext from '../userContext';
import displayedPresonContext from '../DisplayedPersonContext';
dotenv.config();

const useStyles = makeStyles((theme) => ({
    autocomplete: {
        backgroundColor: '#fff',
        margin: '1em 1em 1em 1em',
    },
}));

const UsersBox: React.FC = () => {
    const classes = useStyles();
    const { user } = useContext(userContext);
    const { displayedPerson, setDisplayedPerson } = useContext(
        displayedPresonContext
    );

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<User[]>([]);

    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            Axios.get(`http://${process.env.REACT_APP_HOST}/api/users`)
                .then((res) => res.data.users)
                .then((users: User[]) => {
                    if (active) {
                        setOptions(users);
                    }
                });
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    const optionLabel = (option: User): string => {
        return (
            option._id +
            ' - ' +
            option.name +
            (user?._id === option._id ? ' (מחובר)' : '')
        );
    };

    return (
        <div className={classes.autocomplete}>
            <Autocomplete
                style={{ width: 300 }}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                getOptionSelected={(option, value) =>
                    option.name === value.name
                }
                onChange={(_, value) => value && setDisplayedPerson(value)}
                value={displayedPerson}
                getOptionLabel={optionLabel}
                options={options}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="בחר חייל"
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? (
                                        <CircularProgress
                                            color="inherit"
                                            size={20}
                                        />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />
        </div>
    );
};
export default UsersBox;
