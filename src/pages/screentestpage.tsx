export default function ScreenTest(){
    return(
        <>
            <p className="flex">undersmall</p>
            <p className="hidden sm:block">small bk</p>
            <p className="hidden md:block">medium bk</p>
            <p className="hidden lg:block">large bk</p>
            <p className="hidden xl:block">extra large bk</p>
            <p className="hidden 2xl:block">extra extra large bk</p>
        </>
    );
}