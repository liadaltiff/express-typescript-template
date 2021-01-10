import {
    Button,
    Card,
    CardContent,
    createStyles,
    Grid,
    makeStyles,
    Theme,
    Typography,
    useTheme,
} from '@material-ui/core';
import React from 'react';
import Task from './TaskInteface';

interface ExchangeCardProps {
    task: Task;
    handleExchange: (task: Task) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardGrid: {
            display: 'flex',
            alignItems: 'center',
        },
    })
);

const ExchangeCard: React.FC<ExchangeCardProps> = ({
    task,
    handleExchange,
}) => {
    const classes = useStyles();
    return (
        <Card>
            <CardContent>
                <Grid
                    container
                    wrap="nowrap"
                    spacing={2}
                    className={classes.cardGrid}
                >
                    <Grid item>
                        <Typography>{task.name}</Typography>
                        <Typography>
                            {task.date.toLocaleDateString('fr-fr')}
                        </Typography>
                        <Typography>
                            {task.startingHour}-{task.endingHour}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                                handleExchange(task);
                            }}
                        >
                            החלף
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ExchangeCard;
