import { useTheme } from "@emotion/react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"




const NotesElement = () => {
    const theme = useTheme();
    return (
        <Accordion >
            <AccordionSummary 
                expandIcon={<ExpandMoreIcon sx={{color: '#F6F4F1'}} />} 
                style={{ backgroundColor: theme.palette.background.default }}
            >
                <Typography variant="subtitle1"> Megjegyzések </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: theme.palette.background.default }} >
                <Typography variant='subtitle2' > <strong> 1. back - end logika kiválasztása: </strong> </Typography>
                <Typography variant='body2'> 
                    Az elején sokat gondolkoztam azon, hogy elég-e esetleg local-storage a back-end logikához. 
                    Az érvek, ellenérvek között természetesen ott volt az egyszerűség és gyorsaság amit a local storage kínál, 
                    de ha esetleg későbbiekben tovább fejleszteném az alkalmazást, akkor a rendes szerver / adatbázis jobb választás, 
                    így amellett döntöttem. A backendhez végül expressJS / SQL -t használtam. Igyekeztem a szerveri logikát azért 
                    minimalizálni, és a fókuszt a React elemeken tartani.  
                </Typography>
                <Typography variant='subtitle2' > <strong> 2. Autentikáció: </strong> </Typography>
                <Typography variant='body2'> 
                    A feladat könnyebbségét jelentette, hogy teljes körű autentikációt nem kellet kiépíteni, viszont az szükséges volt, hogy
                    az egyes userek külön-külön beazonosíthatóak legyenek. Végül  (részben a szerver használat okán) az egyes userek azonosítására cookikba mentett
                    egyei azonosítokat használtam. Mivel a feladatban nem volt leírva, hogy az Üzemeletetők is választhatnak nevet, az üzemeletető oldal egységes. 
                    Ugyanakkor az Üzemeltetők egyedileg is azonosításra kerülnek, így később ha az alkalmazás további fejlesztésre kerül, lehetőség van ennek kihasználására. 

                    Ahogy említettem az Üzemeltetői oldal egységes: minden ujaonnan regisztrált üzemeltető, "megörökli" az előző pramatéreiet (pl.: egyenleg).
                </Typography>
                <Typography variant='subtitle2' > <strong> 3. Játék ciklus: </strong> </Typography>
                <Typography variant='body2'> 
                    A feladat külön nem tért ki arra, hogy milyen gyakorisággal kell megtartani a húzásokat, milyen rendszer alapján történnek a játék ciklusai. 
                    A megoldásomba az alkalmazás mindig megnézi hogy van e aktív játék: ha van, annak az adatival készit a forntend egy "uj jatek instaszot", ha nincs teljesen ujat készít,
                    majd updateli a backendet (kivéve ha az előző húzás után az üzemeltető nem indított még új játékot). 

                    Húzás után, pedig a huzás által generált adatokkal dolgozik az alkalmazás, egészen addig, még az üzemeltető nem indít új játékot. 
                </Typography>
                <Typography variant='subtitle2' > <strong> 4. Nyelv használat: </strong> </Typography>
                <Typography variant='body2'> 
                    A fejlesztés során végig vaciláltam a nyelv használaton, mivel a vonatkozó tudást angolul szerveztem meg, nehéz volt egy-két formulát "magyarosítani", 
                    így végül inkább az angol nyelv használata felé hajlottam. De a bizonytalanság pl.: a kommenteken nélhol tetten érhető. {':)'}
                </Typography>
                <Typography variant='subtitle2' > <strong> 5. Játék logika: </strong> </Typography>
                <Typography variant='body2'> 
                    60% / 40% -ban oszilk meg a profit az üzemeltető és a játékos között. A 60% tovább osztásra kerül a nyertes szelvények között. 
                </Typography>
                <Typography variant='subtitle2' > <strong> Összefoglalás: </strong> </Typography>
                <Typography variant='body2'> 
                    A feladat megoldását végig nagyon élveztem. Utólag talán a fornt-end oldlara (és így esetleg a local - storagera) még több hangsúlyt fekttem volna, 
                    de mivel alapvetőleg eddig full-stack hozzáálással készíttem mindent, adott volt számomra a szerver oldal kiépítése is. A feladatban kihívást jelentett többek között
                    az alkalmazás teljes körű hosztolása (heroku, netlify, jawsdb), illetve a rendelkezésre álló idő keret (amit igyekeztem megtartani). A megoldás során igyekeztem a git repot is rendszeresen vezetni. 
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
};

export default NotesElement;