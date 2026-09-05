import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSessionStore } from '../store/sessionStore';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Title from '../components/common/Title';
import ResultStats from '../components/game/ResultStats';

const ResultsPage = () => {
    const { sessionId } = useParams();
    const navigate = useNavigate();
    const getSession = useSessionStore((state) => state.getSession);

    const session = getSession(sessionId);

    useEffect(() => {
        if (!session) {
            navigate('/404');
        }
    }, [session, navigate]);

    if (!session) {
        return null;
    }

    const handlePlayAgain = () => {
        navigate(`/game/${sessionId}`);
    };

    const handleExit = () => {
        navigate('/sessions');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center p-4 pt-24">
            <Card className="text-center">
                <Title size="medium">Результати сесії</Title>

                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-lg font-semibold mb-2">
                        {session.settings.playerOneName} VS {session.settings.playerTwoName}
                    </p>
                    <p className="text-sm text-gray-600">
                        ID сесії: {sessionId}
                    </p>
                </div>

                <ResultStats winner={null} stats={session.stats} />

                <div className="flex gap-4 mt-8 justify-center flex-wrap">
                    <Button onClick={handlePlayAgain} variant="success">
                        ▶️ Грати ще раз
                    </Button>
                    <Button onClick={handleExit} variant="secondary">
                        📋 Всі сесії
                    </Button>
                    <Button onClick={() => navigate('/')} variant="secondary">
                        🏠 На головну
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default ResultsPage;
