export default {
    landscape: {
        table_x: 2,             
        table_y: 2,
        field_x: 70,           
        field_y: -50,

        bet_level_1_x: 280,     
        bet_level_1_y: 180,

        bet_level_10_x: 195,    
        bet_level_10_y: 180,

        bet_level_50_x: 110,    
        bet_level_50_y: 180,

        bet_level_100_x: 25,   
        bet_level_100_y: 180,

        bet_level_500_x: -60,   
        bet_level_500_y: 180,

        undo_x: -165,            
        undo_y: 180,

        clear_x: -245,           
        clear_y: 180,

        drum_x: -370,            
        drum_y: -63,
        
        ball_x: 0,            
        ball_y: 0,

        history_x: -605,           
        history_y: -10,

        game_balance_x: 1,      
        game_balance_y: 1,

        game_balance_w: 200,    
        game_balance_h: 500,

        coin_gb_x: 520,         
        coin_gb_y: -120,

        info_coin_x: -780,
        info_coin_y: 670,

        bet_x: -90,            
        bet_y: 0,

        bet_volume_x: -50,      
        bet_volume_y: 65,
        bet_volume_fs: 60,
        bet_fs: 40,

        credits_x: -135,        
        credits_y: -200,

        credits_volume_x: -50, 
        credits_volume_y: -140,
        credits_volume_fs: 60,
        credits_fs: 40,

        win_x: -50,             
        win_y: 140,

        win_volume_x: -40,     
        win_volume_y: 200,
        win_volume_fs: 80,
        win_fs: 40,

        rebet_x: 490,          
        rebet_y: 110,

        start_x: 490,          
        start_y: 210,

        cheaps_win_x: 340,
        cheaps_win_y: 80,

        cheaps_loose_x: -550,
        cheaps_loose_y: 120,
    },
    portrait: {
        table_x: 2.6,           
        table_y: 2.2,

        field_x: 190,           
        field_y: 110,

        bet_level_1_x: 400,     
        bet_level_1_y: 310,

        bet_level_10_x: 400,    
        bet_level_10_y: 225,

        bet_level_50_x: 400,    
        bet_level_50_y: 140,

        bet_level_100_x: 400,   
        bet_level_100_y: 55,

        bet_level_500_x: 400,   
        bet_level_500_y: -30,

        undo_x: 400,            
        undo_y: -115,

        clear_x: 400,           
        clear_y: -200,

        drum_x: 195,            
        drum_y: -278,

        ball_x: 0,            
        ball_y: 0,

        history_x: -150,           
        history_y: -150,

        game_balance_x: 1,      
        game_balance_y: 1,

        game_balance_w: 200,    
        game_balance_h: 500,

        coin_gb_x: -105,        
        coin_gb_y: 190,

        info_coin_x: -180,
        info_coin_y: -75,

        bet_x: -100,            
        bet_y: 0,

        bet_volume_x: -72,      
        bet_volume_y: 75,
        bet_volume_fs: 70,
        bet_fs: 50,

        credits_x: -180,        
        credits_y: 180,

        credits_volume_x: -70, 
        credits_volume_y: 245,
        credits_volume_fs: 70,
        credits_fs: 50,

        win_x: 335,            
        win_y: 480,
        win_volume_x: 335,     
        win_volume_y: 550,
        win_volume_fs: 70,
        win_fs: 50,

        rebet_x: -150,             
        rebet_y: 520,

        start_x: 340,             
        start_y: 520,

        cheaps_win_x: -90,
        cheaps_win_y: 420,

        cheaps_loose_x: -120,
        cheaps_loose_y: -500,
    },
    service: {
        test: 10,
        volume: 10,
        bets: {},
        bet: 0,
        headers: [],
        response: {},
        lastResponse: {},
        wins: [],
        changeBalance: 0,
        credits: 0,
        betMade: false,
        resize: true,
        isAllowedPlayTheGame: true,
        win: 12,
        action: false,
        help: false,
        history: {
            bets: {},
            headers: [],
            betList: [],
            rebetList: [],
            rebetHeaders: [],
            undoBet: {},
            win_bets: [],
            undoList: []
        },
        fullscreen: true,
        gameStarted: false,
        alertStopped: true,
        tap: 0,
        collected: false,
        winPosition: {
            x: 0,
            y: 0,
        },
        winArea: {},
        isOrientationChanged: true,
        isAllowedToSwitchOff: false,
        currentNum: {x: 0, y: 0},
        isAllawedToInteractive: true,
        isPlayFalled: false,
        coefMap: {single: 0, even: 0, quartet: 0, pair: 0}
    },
    map: {
        "l": ["s1", "s2", "s3", "s4", "s5", "s6", ""],
        "e": ["s2", "s4", "s6", "s8", "s10", "s12", ""],
        "b": ["s2", "s4", "s6", "s7", "s9", "s11", ""],
        "r": ["s1", "s3", "s5", "s8", "s10", "s12", ""],
        "o": ["s1", "s3", "s5", "s7", "s9", "s11", ""],
        "m": ["s7", "s8", "s9", "s10", "s11", "s12", ""],
        "q1.2.3.4": ["s1", "s2", "s3", "s4", ""],
        "q3.4.5.6": ["s3", "s4", "s5", "s6", ""],
        "q5.6.7.8": ["s5", "s6", "s7", "s8", ""],
        "q7.8.9.10": ["s7", "s8", "s9", "s10", ""],
        "q9.10.11.12": ["s9", "s10", "s11", "s12", ""],
        "p1.2": ["s1", "s2", ""],
        "p1.3": ["s1", "s3", ""],
        "p2.4": ["s2", "s4", ""],
        "p3.4": ["s3", "s4", ""],
        "p3.5": ["s3", "s5", ""],
        "p4.6": ["s4", "s6", ""],
        "p5.6": ["s5", "s6", ""],
        "p5.7": ["s5", "s7", ""],
        "p6.8": ["s6", "s8", ""],
        "p7.8": ["s7", "s8", ""],
        "p7.9": ["s7", "s9", ""],
        "p8.10": ["s8", "s10", ""],
        "p9.10": ["s9", "s10", ""],
        "p9.11": ["s9", "s11", ""],
        "p10.12": ["s10", "s12", ""],
        "p11.12": ["s11", "s12", ""],
        "s1": ["s1", ""],
        "s2": ["s2", ""],
        "s3": ["s3", ""],
        "s4": ["s4", ""],
        "s5": ["s5", ""],
        "s6": ["s6", ""],
        "s7": ["s7", ""],
        "s8": ["s8", ""],
        "s9": ["s9", ""],
        "s10": ["s10", ""],
        "s11": ["s11", ""],
        "s12": ["s12", ""]
    },
    timeWorkerSrc: "./timeWorker.js"
}