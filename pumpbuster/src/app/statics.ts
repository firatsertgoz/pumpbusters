import { Injectable }    from '@angular/core';


@Injectable()
export class Statics {
    globals
    currencies = [ "ETH","NMR", "ANS","XRP","KORE","SC", "LTC","LTC", "BNT","DGB","BURST","XVG","BTS","CFI","XEM","RDD","WAVES","ARK","TRUST","EDG","ENRG","LBC","ETC","NXT","GNT","BAY",
    "SHIFT","BAT","BNT","ZEC","QRL","MYST","GAME","KMD","NMR","DASH","PIVX","VTC","ARDR","XZC","SYS","CLOAK","LSK","STEEM","PPC","CANN","NAUT","ANT","UBQ","DOGE","PTOY","HMQ","LMC",
    "VIA","ETH","SNRG","FCT","OMNI","WINGS","XMR","XLM","VRM","MONA","SNGLS","MUE","AGRS","MUSIC","NLG","ZEN","AMP","VTR","ANT","GBYTE","BTC","XMY","SEQ","BLK","FLDC","GBG","XDN",
    "EXP","RLC","FAIR","TRST","1ST","8BIT","DTB","BITB","MAID","TKN","FTC","CRB","DGD","IOC","MYST","NAV","EMC","GRC","NEOS","BCY","GNT","REP","COVAL","SBD","SWT","IOP","CRW","ETC",
    "CRB","LGD","LUN","APX","CLAM","BAT","SPR","GUP","PINK","DAR","RADS","SNGLS","EXCL","TIME","BLOCK","GOLOS","TKN","HKG","NXS","START","GEO","POT","USNBT","SJCX","BTCD","VRC","THC",
    "ZCL","CLUB","CPC","QWARK","INCNT","NXC","BYC","XMG","DOPE","SAFEX","GLD","XWC","EGC","OK","FLO","PTOY","DMD","CURE","MLN","TKS","GRS","PTC","RISE","GNO","DYN","BLITZ","XST","INFX",
    "XBB","XVC","GAM","QRL","WINGS","QTL","GCR","SLR","SIB","EBST","PEPE","PKB","BSD","TX","DRACO","RLC","SWIFT","XAUR","SYNX","EMC2","PDC","BTA","EFL","2GIVE","DGD","ERC","AUR",
    "SPHR","RBY","1ST","REP","AEON","BRX","BRK","SLS","LUN","ION","UNB","TRST","JWL","UNO","LGD","TIME","GUP","GNO"
    ]
    alertedObj = {}

   currencyImageMap = {'VRC': 'VRC.svg', 'XAI': 'XAI.svg', 'RISE': 'RISE.svg', 'OK': 'OK.svg', 'BSD': 'BSD.svg',
    'XRP': 'XRP.svg', 'CLAM': 'CLAM.svg', 'BFT': 'BFT.svg', 'MSC': 'MSC.svg', 'SYS': 'SYS.svg', 'FTC': 'FTC.svg',
     'KOBO': 'KOBO.svg', 'RBY': 'RBY.svg', 'MTR': 'MTR.svg', 'NXT': 'NXT.svg', 'LTC': 'LTC.svg', 'SNRG': 'SNRG.svg', 
     'LDOGE': 'LDOGE.svg', 'ETC': 'ETC.svg', 'AEON': 'AEON.svg', 'BTA': 'BTA.svg', 'IOC': 'IOC.svg', 'TRIG': 'TRIG.svg',
      'CLOAK': 'CLOAK.svg', 'MRC': 'MRC.svg', 'OMNI': 'OMNI.svg', 'SAR': 'SAR.svg', 'XVG': 'XVG.svg', 'YBC': 'YBC.svg', 
      'STRAT': 'STRAT.svg', 'AUR': 'AUR.svg', 'BTCD': 'BTCD.svg', 'BRX': 'BRX.svg', 'SLS': 'SLS.svg', 'SWIFT': 'SWIFT.svg',
       'PINK': 'PINK.svg', 'ZEIT': 'ZEIT.svg', 'QRK': 'QRK.svg', 'EMC': 'EMC.svg', 'INCNT': 'INCNT.svg', 'UNITY': 'UNITY.svg',
        'NBT': 'NBT.svg', 'GAME': 'GAME.svg', 'KMD': 'KMD.svg', 'XPM': 'XPM.svg', 'LBC': 'LBC.svg', 'RBIES': 'RBIES.svg', 'VNL': 'VNL.svg',
         'NEU': 'NEU.svg', 'ETH': 'ETH.svg', 'RBT': 'RBT.svg', 'DASH': 'DASH.svg', 'MINT': 'MINT.svg', 'SDC': 'SDC.svg', 'ADC': 'ADC.svg', 'KORE': 'KORE.svg'
         , 'DOGE': 'DOGE.svg', 'PIGGY': 'PIGGY.svg', 'DGB': 'DGB.svg', 'TX': 'TX.svg', 'BCN': 'BCN.svg', 'BRK': 'BRK.svg', 'WAVES': 'WAVES.svg', 'GNT': 'GNT.svg'
         , 'MUE': 'MUE.svg', 'VPN': 'VPN.svg', 'MAID': 'MAID.svg', 'ARCH': 'ARCH.svg', 'BAY': 'BAY.svg', 'PPC': 'PPC.svg', 'ARDR': 'ARDR.svg', 'DGD': 'DGD.svg'
         , 'POT': 'POT.svg', 'START': 'START.svg', 'IFC': 'IFC.svg', 'NVC': 'NVC.svg', 'SCOT': 'SCOT.svg', 'XCP': 'XCP.svg', 'DGX': 'DGX.svg', 'ANC': 'ANC.svg', 
         'GLD': 'GLD.svg', 'VTC': 'VTC.svg', 'your-turn': 'your-turn.mp3', 'NMC': 'NMC.svg', 'DAO': 'DAO.svg', 'NEOS': 'NEOS.svg', 'XEM': 'XEM.svg', 'DCR': 'DCR.svg', 
         'NOTE': 'NOTE.svg', 'GDC': 'GDC.svg', 'SLG': 'SLG.svg', 'SYNC': 'SYNC.svg', 'VIOR': 'VIOR.svg', 'FRK': 'FRK.svg', 'ERC': 'ERC.svg', 'LISK': 'LISK.svg',
          'REP': 'REP.svg', 'BANX': 'BANX.svg', 'SJCX': 'SJCX.svg', 'STR': 'STR.svg', 'SIA': 'SIA.svg', 'BC': 'BC.svg', 'ZEC': 'ZEC.svg', 'JBS': 'JBS.svg', 
          'OPAL': 'OPAL.svg', 'BTC': 'BTC.svg', 'XMR': 'XMR.svg', 'RDD': 'RDD.svg', 'HEAT': 'HEAT.svg', 'STEEM': 'STEEM.svg', 'BTS': 'BTS.svg', 
          'GRC': 'GRC.svg', 'GRS': 'GRS.svg', 'GEMZ': 'GEMZ.svg', 'NLG': 'NLG.svg', 'DMD': 'DMD.svg', 'UBQ': 'UBQ.svg', 'USDT': 'USDT.svg', 
          'PIVX': 'PIVX.svg', 'XBS': 'XBS.svg', 'MONA': 'MONA.svg', 'FCT': 'FCT.svg', 'AMP': 'AMP.svg', 'FC2': 'FC2.svg', 'FLO': 'FLO.svg', 'ICN': 'ICN.svg'}

    constructor() { 
        this.globals = 5;
        this.currencies.forEach((currency, idx) => {
            if( Object.keys(this.currencyImageMap).indexOf(currency) == -1){
                this.currencyImageMap[currency] =  "BTC.svg"
            } 

        })
        
    }

}