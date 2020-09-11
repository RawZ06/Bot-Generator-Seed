git submodule init 
git submodule update
cd ootrando/OoT-Randomizer/
git checkout Dev-R
cd ../..
cp random-settings/OoTR-random-settings/MysterySettings.py ootrando/OoT-Randomizer
cp weights/mystery-weights.json ootrando/OoT-Randomizer
cp settings/settings.sav.ran.default settings/settings.sav.ran
cp settings/settings.sav.std.default settings/settings.sav.std